/* First pass: functions for converting Howit-Fison data into phonemes, by the
/* use of simple correspondences applied to an input string. */

//Function 1: takes a string, applies sound transformations to it.
var transform = function(s) {
  var output = s.toLowerCase()
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
  return(output);
}
