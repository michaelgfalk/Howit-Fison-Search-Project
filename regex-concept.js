/* This script takes the user's search term and turns it into a regular expression, which can then be used to search through the corpus object to find possible matches. The results are ordered by the edit distance between the search term and the matched term. */

//Function 1: gets the input from the search box and passes it to the other functions.
function runSearch() {
  var searchTerm;
  searchTerm = document.getElementById("searchTerm").value;
  findMatches(howFisCorpus, searchTerm, 10);
  //Then scroll back to the top of the page.
  window.scroll({
    top: 0,
    behavior: "smooth"
  });
}

//Function 2: turns the user's search term into a regex according to the given sound equivalences.
function convertSearchTerm(searchTerm) {
  var phonemes, regexStr = "", regex;
  //Step 1: Process the search term, turning it into an array that can be converted into a regular expression.
  phonemes = searchTerm.toLowerCase() //Convert to lower case.
  .replace(/\s/g, "S") //catch all whitespace characters (this is essential for handling search terms that are phrases)
  .replace(/[\u{0000}-\u{0040}\u{005B}-\u{0060}\u{007B}-\u{007E}]/gu, "") //remove punctuation and leave spaces. The unicode notation has to be used in order to avoid removing special characters like 'ŋ'.
  .replace(/(\u{014b}|ng)/gu, "6")
  .normalize('NFD').replace(/[\u{0300}-\u{036f}]/gu, "") //Remove the diacritics. 'normalize('NFD') decomposes all the diacritics (e.g. 'è' -> 'e + `'). Then the replace function strips out all the symbols.
  .replace(/rr/g, "9")
  .replace(/wu/g, "u")
  .replace(/yi/g, "i")
  .replace(/([bcdfghjklmnpqstvwxyz])\1*/g, function(m, $1) {
    return($1);
  }) //replace any repeated consonants except 'r' with a single one.
  .replace(/(p|b)/g, "7")
  .replace(/(g|k|c|ck)/g, "K")
  .replace(/(dh|ty|dy|rd|rt|t|d|j)/g, "8")
  .replace(/(rl|lh|ly|l)/g, "5")
  .replace(/(rn|nh|ny|nj|n)/g, "4")
  .replace(/(ah|ar|a)/g, "2")
  .replace(/(oo|u)/g, "3")
  .replace(/(ee|i|y)/g, "1")
  .replace(/h/g, "0")
  .split(""); //This turns the phonemes into an array, which is necessary for the next step.

  //Step 2: loop through each phoneme in the array, and turn it into a component of a regular expression.
  phonemes.forEach(function(element) {
    switch(element) {
      case "0":
      regexStr += "h?"; //The search term will match an 'h' if it is there, and ignore it otherwise.
      break;
      case "1":
      regexStr += "(?:ee|i|y)";
      break;
      case "2":
      regexStr += "(?:ah|ar|a|u)";
      break;
      case "3":
      regexStr += "(?:oo|u)";
      break;
      case "4":
      regexStr += "(?:rn|nh|ny|nj|n){1,2}";
      break;
      case "5":
      regexStr += "(?:rl|lh|ly|l){1,2}";
      break;
      case "6":
      regexStr += "(?:\\u{014b}|ng){1,2}";
      break;
      case "7":
      regexStr += "(?:p|b){1,2}";
      break;
      case "K":
      regexStr += "(?:g|k|c|ck){1,2}";
      break;
      case "8":
      regexStr += "(?:dh|ty|dy|rd|rt|t|d|j){1,2}";
      break;
      case "9":
      regexStr += "rr";
      break;
      case "S":
      regexStr += ".+\\s";
      break;
      default:
      //If no sound transformation has been performed on a particular character, then it is included untransformed in the regex.
      regexStr += element;
      break;
    }
  });

  //Step 3: Take regexStr, which is a string, and use the RegExp constructor to turn it into a regular expression that the machine can use to search through the data.
  regex = new RegExp("(" + regexStr + ")", "giu");
  //"giu" are "flags" that indicate that regex will find all matches in a document ('g'), is case insensitive ('i') and contains unicode ('u').
  //The parentheses make the entire regex a 'capture group', which will be useful later for running a string matching algorithm.

  return regex;
}

//Function 3: finds text matches in the corpus object, then produces a list of results and pushes it to the DOM. The 'corpus' must be an array of objects, each of which has the properties 'title' and 'text'. The optional 'context' parameter defines how much text to display in the results.
function findMatches(corpus, searchTerm, context = 15) {
  var regex, results = [], addTerms;
  //First, we need to deal with the possiblity of a phrase.
  if (/\s/g.test(searchTerm) === false) {
    //If there are no spaces, then the number of additional terms is 0.
    addTerms = 0
  } else {
    //If there are spaces, then this is a phrase. To caculate the number of additional terms in the phrase, simply count the number of spaces. (A two-word phrase will have one additional term, and also one space.)
    addTerms = searchTerm.match(/\s/g).length
  }
  regex = convertSearchTerm(searchTerm);
  //Loop through each item in the corpus
  corpus.forEach(function(doc) {
    //Create two new variables. 'hits' will be an array of strings. Each string will contain the hit and some context words either side. 'scores' will be an array of numbers. Each number will be the string matching score of that hit. These will be pushed to the 'results' array.
    var tokens = doc.tokens;
    tokens.forEach(function(word, i) {
      var matchPhrase, hitArr = [], hitStr, score, left;
      matchPhrase = word //Add the first search term to the matchPhrase
      if (addTerms > 0) {
        //If there are additional words in the search string, add a corresponding number to the matchPhrase to create an n-gram.
        for (j = 1; j <= addTerms; j++) {
          matchPhrase += " ";
          matchPhrase += tokens[i + j];
        }
      }
      if (regex.test(matchPhrase)) { //Does the word/phrase match the regex? If so...

        //Step 1: Grab the hit and add context words either side.
        //The if-else block ensures that the algorithm still works even if the hit is near the start or end of the text. It sets the leftmost boundary of the context block.
        if (i - context <= 0) {
          left = 0;
        } else {
          left = i - context;
        }
        //Once the leftmost boundary is set, work forwards, adding words to the array until either it reaches the end or the required number of context words are included.
        for (k = left; (k < tokens.length && k <= left + context * 2); k++) {
          hitArr.push(tokens[k]);
        }
        //Then convert to a string.
        hitStr = "... " + hitArr.join(" ") + " ...";

        //Step 2: Calculate the score of the hit.
        score = stringDistance(searchTerm, matchPhrase)

        //Step 3: Get the title of the document.
        title = doc.title;

        //Store in the results array.
        results.push({"hit":matchPhrase, "title":title, "score":score, "kwic":hitStr});
      }
    })
  })
  //Sort the results by score.
  results.sort(compScores);

  //Display the results on the page (requires jQuery).

  //Clear the previous results.
  $("#content").empty();
  //Clear old heading and add a new one.
  $("#resHeading").empty();
  if (results.length === 1) {
    $("#resHeading").append($("<h2></h2>").text("1 result found for '" + searchTerm + "':"));
  } else {
    $("#resHeading").append($("<h2></h2>").text(results.length + " results found for '" + searchTerm + "':"));
  }
  //Add a container for the search results.
  $("#content").append("<div id='results'></div>");
  results.forEach(function(result, index) {
    var kwicOut, resID
    resID = "#res-" + index;
    $("#results").append($("<div class='result' id='res-" + index + "'></div>"));
    $(resID).append($("<p class='hit'></p>").text(result.hit));
    $(resID).append($("<p class='score'></p>").text("String distance score: " + result.score));
    //Highlight the key term in the kwic output.
    kwicOut = result.kwic.replace(regex, (match, p1) => "<mark>" + p1 + "</mark>")
    $(resID).append("<p class='kwic'>" + kwicOut + "</p>");
    $(resID).append($("<p class='title'></p>").text("From: document " + result.title));
  })

  return results;
}

//Function 4: a function that calculates the Levenshtein distance between two strings.

/*
Copyright (c) 2011 Andrei Mackenzie
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function stringDistance(a, b){
  //Strip punctuation and digits
  a = a.replace(/[\u{0000}-\u{001F}\u{0021}-\u{0040}\u{005B}-\u{0060}\u{007B}-\u{007E}]/gu, "")
  b = b.replace(/[\u{0000}-\u{001F}\u{0021}-\u{0040}\u{005B}-\u{0060}\u{007B}-\u{007E}]/gu, "")

  //Then do algorithm
  if(a.length == 0) return b.length;
  if(b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

//Function 5: comparison function for sorting the results array.
function compScores(a,b) {
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) {
    return 1;
  }
  return 0;
}
