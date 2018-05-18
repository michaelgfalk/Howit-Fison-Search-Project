//Aim: to create an array of objects. Each object will have a 'title' and a 'text' string.

//Define global variables.

var fileNames, howFisCorpus = [];
//var test;

//Define a function that takes an xml document, extracts the title and text, and converts it into a JavaScript object.
function getText(xml) {
  var doc, title, paras, i, j, text = "", tokens, empties;
  doc = xml.responseXML;
  title = doc.querySelectorAll("h1.work-title")[0].innerHTML;
  paras = doc.getElementsByTagName("p"); //Get the paragraphs...
  for (i = 0; i < paras.length; i++) { //Loop through them...
    text += paras[i].innerText; //Grab the text...
  }
  //Tokenise the text. This is a really simple tokeniser that just splits on space characters.
  tokens = text.split(/\s/)
  //Loop backwards through the array and delete empty strings.
  for (i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i].length === 0) {
      tokens.splice(i, 1);
    }
  }
  //Add the loaded document to the corpus.
  howFisCorpus.push({"title":title, "text":text, "tokens":tokens});
}

//Define a function for fetching xml docs from the server.
function fetchDocument(fileName) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //When the data is ready, return it as an xml document, and pass it to getText().
      getText(this);
      //test = this;
    }
  };
  xhttp.open("GET", fileName, true);
  xhttp.send();
}

//Create an array of file names.
fileNames = ['HowFisPapers/xm10-icdms-lowres.xhtml',
'HowFisPapers/xm100-icdms-lowres.xhtml',
'HowFisPapers/xm105-icdms-lowres.xhtml',
'HowFisPapers/xm106-icdms-lowres.xhtml',
'HowFisPapers/xm107-icdms-lowres.xhtml',
'HowFisPapers/xm11-icdms-lowres.xhtml',
'HowFisPapers/xm118-icdms-lowres.xhtml',
'HowFisPapers/xm12-icdms-lowres.xhtml',
'HowFisPapers/xm121-icdms-lowres.xhtml',
'HowFisPapers/xm122-icdms-lowres.xhtml',
'HowFisPapers/xm123-icdms-lowres.xhtml',
'HowFisPapers/xm124-icdms-lowres.xhtml',
'HowFisPapers/xm125-icdms-lowres.xhtml',
'HowFisPapers/xm159-icdms-lowres.xhtml',
'HowFisPapers/xm160-icdms-lowres.xhtml',
'HowFisPapers/xm161-icdms-lowres.xhtml',
'HowFisPapers/xm17-icdms-lowres.xhtml',
'HowFisPapers/xm187-icdms-lowres.xhtml',
'HowFisPapers/xm188-icdms-lowres.xhtml',
'HowFisPapers/xm208-icdms-lowres.xhtml',
'HowFisPapers/xm21-icdms-lowres.xhtml',
'HowFisPapers/xm22-icdms-lowres.xhtml',
'HowFisPapers/xm225-icdms-lowres.xhtml',
'HowFisPapers/xm226-icdms-lowres.xhtml',
'HowFisPapers/xm23-icdms-lowres.xhtml',
'HowFisPapers/xm235-icdms-lowres.xhtml',
'HowFisPapers/xm237-icdms-lowres.xhtml',
'HowFisPapers/xm259-icdms-lowres.xhtml',
'HowFisPapers/xm32-icdms-lowres.xhtml',
'HowFisPapers/xm33-icdms-lowres.xhtml',
'HowFisPapers/xm34-icdms-lowres.xhtml',
'HowFisPapers/xm35-icdms-lowres.xhtml',
'HowFisPapers/xm36-icdms-lowres-07a64cce-d5f4-4fa1-87c9-a02a93aea200.xhtml',
'HowFisPapers/xm36-icdms-lowres.xhtml',
'HowFisPapers/xm37-icdms-lowres.xhtml',
'HowFisPapers/xm38-icdms-lowres.xhtml',
'HowFisPapers/xm39-icdms-lowres.xhtml',
'HowFisPapers/xm4-icdms-lowres.xhtml',
'HowFisPapers/xm40-icdms-lowres.xhtml',
'HowFisPapers/xm41-icdms-lowres.xhtml',
'HowFisPapers/xm42-icdms-lowres.xhtml',
'HowFisPapers/xm43-icdms-lowres.xhtml',
'HowFisPapers/xm438-icdms-lowres.xhtml',
'HowFisPapers/xm44-icdms-lowres.xhtml',
'HowFisPapers/xm45-icdms-lowres.xhtml',
'HowFisPapers/xm455-icdms-lowres.xhtml',
'HowFisPapers/xm461-icdms-lowres.xhtml',
'HowFisPapers/xm5-icdms-lowres.xhtml',
'HowFisPapers/xm505-icdms-lowres.xhtml',
'HowFisPapers/xm521-icdms-lowres.xhtml',
'HowFisPapers/xm524-icdms-lowres.xhtml',
'HowFisPapers/xm526-icdms-lowres.xhtml',
'HowFisPapers/xm549-icdms-lowres.xhtml',
'HowFisPapers/xm581-icdms-lowres.xhtml',
'HowFisPapers/xm591-icdms-lowres.xhtml',
'HowFisPapers/xm593-icdms-lowres.xhtml',
'HowFisPapers/xm6-icdms-lowres.xhtml',
'HowFisPapers/xm620-icdms-lowres.xhtml',
'HowFisPapers/xm668-icdms-lowres.xhtml',
'HowFisPapers/xm689-icdms-lowres.xhtml',
'HowFisPapers/xm690-icdms-lowres.xhtml',
'HowFisPapers/xm691-icdms-lowres.xhtml',
'HowFisPapers/xm692-icdms-lowres.xhtml',
'HowFisPapers/xm695-icdms-lowres.xhtml',
'HowFisPapers/xm696-icdms-lowres.xhtml',
'HowFisPapers/xm698-icdms-lowres.xhtml',
'HowFisPapers/xm7-icdms-lowres.xhtml',
'HowFisPapers/xm702-icdms-lowres.xhtml',
'HowFisPapers/xm703-icdms-lowres.xhtml',
'HowFisPapers/xm725-icdms-lowres.xhtml',
'HowFisPapers/xm75-icdms-lowres.xhtml',
'HowFisPapers/xm759-icdms-lowres.xhtml',
'HowFisPapers/xm76-icdms-lowres.xhtml',
'HowFisPapers/xm760-icdms-lowres.xhtml',
'HowFisPapers/xm761-icdms-lowres.xhtml',
'HowFisPapers/xm765-icdms-lowres.xhtml',
'HowFisPapers/xm77-icdms-lowres.xhtml',
'HowFisPapers/xm775-icdms-lowres.xhtml',
'HowFisPapers/xm78-icdms-lowres.xhtml',
'HowFisPapers/xm79-icdms-lowres.xhtml',
'HowFisPapers/xm8-icdms-lowres.xhtml',
'HowFisPapers/xm80-icdms-lowres.xhtml',
'HowFisPapers/xm81-icdms-lowres.xhtml',
'HowFisPapers/xm82-icdms-lowres.xhtml',
'HowFisPapers/xm83-icdms-lowres.xhtml',
'HowFisPapers/xm84-icdms-lowres.xhtml',
'HowFisPapers/xm85-icdms-lowres.xhtml',
'HowFisPapers/xm86-icdms-lowres.xhtml',
'HowFisPapers/xm87-icdms-lowres.xhtml',
'HowFisPapers/xm88-icdms-lowres.xhtml',
'HowFisPapers/xm89-icdms-lowres.xhtml',
'HowFisPapers/xm9-icdms-lowres.xhtml',
'HowFisPapers/xm90-icdms-lowres.xhtml',
'HowFisPapers/xm91-icdms-lowres.xhtml',
'HowFisPapers/xm92-icdms-lowres.xhtml',
'HowFisPapers/xm93-icdms-lowres.xhtml',
'HowFisPapers/xm94-icdms-lowres.xhtml',
'HowFisPapers/xm95-icdms-lowres.xhtml',
'HowFisPapers/xm96-icdms-lowres.xhtml',
'HowFisPapers/xm97-icdms-lowres.xhtml',
'HowFisPapers/xm98-icdms-lowres.xhtml', ]

//Now loop through the array of file names, and import the whole corpus.
fileNames.forEach(function(element){
  fetchDocument(element);
})
