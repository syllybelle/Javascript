//this check compares if two different dates are within +/-2 hours of each other
var TDAT = new Date(E01_V1.MR.MRDAT);
if(MRDAT.getHours() >= TDAT.getHours())
return (((MRDAT.getHours()*60)+MRDAT.getMinutes())-((TDAT.getHours()*60)+TDAT.getMinutes()))<=120;
else return (((TDAT.getHours()*60)+TDAT.getMinutes())-((MRDAT.getHours()*60)+MRDAT.getMinutes()))<=120;