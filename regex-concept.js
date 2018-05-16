/* This is a different idea. What if the user's search term was turned into
a regular expression, which was then used to search through all the documents
on the server?

This would mean that the data would not have to undergo any pre-processing. In
addition, we could use the existing structure of the xhtml files to present
the results of the search.*/

//Function 1: gets the input from the search box and passes it to the other functions.
function runSearch() {
  var searchTerm, result;
  searchTerm = document.getElementById("searchTerm").value;
  result = convertSearchTerm(searchTerm);
  document.getElementById("result").innerHTML = result;
  //document.getElementById("searchTerm").setAttribute("value", searchTerm);
}

//Function 2: turns the user's search term into a regex according to the given sound equivalences.
function convertSearchTerm(searchTerm) {
  var phonemes, regexStr = "", regex;
  //Step 1: Process the search term, turning it into an array that can be converted into a regular expression.
  phonemes = searchTerm.toLowerCase() //Convert to lower case.
  .replace(/[\u{0000}-\u{0040}\u{005B}-\u{0060}\u{007B}-\u{007E}]/gu, "") //remove punctuation. The unicode notation has to be used in order to avoid removing special characters like 'ŋ'.
  .replace(/rr/g, "9")
  .replace(/wu/g, "u")
  .replace(/yi/g, "i")
  .replace(/([bcdfghjklmnpqstvwxyz])\1*/g, function(m, $1) {
    return($1);
  }) //replace any repeated consonants except 'r' with a single one.
  .replace(/(\u{014b}|ng)/gu, "6")
  .replace(/(p|b)/g, "(?:p|b)")
  .replace(/(dh|ty|dy|rd|rt|t|d|j)/g, "8")
  .replace(/(rl|lh|ly|l)/g, "5")
  .replace(/(rn|nh|ny|nj|n)/g, "4")
  .replace(/(ah|ar|a)/g, "2")
  .replace(/(oo|u)/g, "3")
  .replace(/(ee|i|y)/g, "1")
  .replace(/h/g, "")
  .split(""); //This turns the phonemes into an array, which is necessary for the next step.

  //Step 2: loop through each phoneme in the array, and turn it into a component of a regular expression.
  phonemes.forEach(function(element) {
    switch(element) {
      case "1":
        regexStr += "(?:ee|i|y)";
        break;
      case "2":
        regexStr += "(?:ah|ar|a)";
        break;
      case "3":
        regexStr += "(?:oo|u)";
        break;
      case "4":
        regexStr += "(?:rn|nh|ny|nj|n)";
        break;
      case "5":
        regexStr += "(?:rl|lh|ly|l)";
        break;
      case "6":
        regexStr += "(?:\\u{014b}|ng)";
        break;
      case "7":
        regexStr += "(?:p|b)";
        break;
      case "8":
        regexStr += "(?:dh|ty|dy|rd|rt|t|d|j)";
        break;
      case "9":
        regexStr += "rr";
        break;
      default:
        //If no sound transformation has been performed on a particular character, then it is included untransformed in the regex.
        regexStr += element;
        break;
    }
  });

  //Step 3: Take regexStr, which is a string, and use the RegExp constructor to turn it into a regular expression that the machine can use to search through the data.
  regex = new RegExp(regexStr, "giu");
  //"giu" are "flags" that indicate that regex will find all matches in a document ('g'), is case insensitive ('i') and contains unicode ('u').

  return regex;
}
