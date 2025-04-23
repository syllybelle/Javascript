//RegEx test to check if a freetext field contain a number with exactly one decimal point
//note: does not work for number field, but it's not necessary for a number field anyway
var re = /^\d+(?:\.\d)$/;
return re.test(FreeTextID)==true;