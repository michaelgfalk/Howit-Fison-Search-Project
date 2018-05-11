/* This is a different idea. What if the user's search term was turned into
a regular expression, which was then used to search through all the documents
on the server?

This would mean that the data would not have to undergo any pre-processing. In
addition, we could use the existing structure of the xhtml files to present
the results of the search.*/


//Function 1: turns the user's search term into a regex according to the given
//sound equivalences.
function convertSearchTerm(searchTerm) {
  //Some security measures would probably have to be applied. They might interfere
  //with the sound transformations. If everything was happening client-side, this
  //may not be an issue.
  var abstract, phonemes, regex;
  //Remove capital letters, then apply sound transformations to create an abstract
  //representation.
  abstract = searchTerm.toLowerCase()
  .replace(/rr/g, "9") //replace 'rr' with '9'
  .replace(/wu/g, "u") //replace 'wu' with 'u'
  .replace(/yi/g, "i") //replace 'yi' with 'i'
  .replace(/([bcdfghjklmnpqrstvwxyz])\1*/g, function(m, $1) {
    return($1);
  }) //replace any repeated consonants with a single one.
  .replace(/(\u{014b}|ng)/gu, "6") //replace 'ŋ' or 'ng' with '6'
  .replace(/(p|b)/g, "7") //replace 'p' with '7'
  .replace(/(dh|ty|dy|rd|rt|t|d|j)/g, "8") //replace 't' with '8'
  .replace(/(rl|lh|ly|l)/g, "5") //replace 'l' blends with '5'
  .replace(/(rn|nh|ny|nj|n)/g, "4") //replace 'n' blends with '4'
  .replace(/(ah|ar|a)/g, "2") //replace 'a' with '2'
  .replace(/(oo|u)/g, "3") //replace 'u' with '3'
  .replace(/(ee|i|y)/g, "1") //replace 'e' with '1'
  .replace(/h/g, ""); //delete any h's.
  //Now the searchTerm has become an abstract representation, we can turn it into a regex.
  //Step 1: split searchTerm into an array phonemes.
  phonemes = abstract.split("");
  //Step 2: translate this array into a regular expression that can be used to
  //search through the corpus for possible matches.
  regex = //loop through the phonemes and turn them into the correspondening part
  //of the regex

  //For Monday!
  return(regex)
}




//Can you stitch together a bunch of documents into an object?

var fileNames = ['HowFisPapers/xm10-icdms-lowres.xhtml',
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
