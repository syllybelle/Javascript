//to find the earliest of latest date in a set of dates
var dates=[TZDATE1,TZDATE2,TZDATE3];
var minDate = null;
for (var i = 0; i < dates.length; i++) {
	if (dates[i] == null) continue;
	if (minDate != null && (dates[i]-minDate) > 0) continue;
	minDate = new Date(dates[i]);
}
return minDate;
//to test for max date instead, change > to a < at the 5th line of code