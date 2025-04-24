# Date-related edit checks

Example implementation: DM.RFICDAT1
Goal: 
Query message: Date of reconsent is not after the Date of informed consent. Please correct.

```JavaScript
if ((RFICDAT1 != null && RFICDAT != null) && (RFICDAT1 <= RFICDAT))
return false;
else return true;
```

As an option, you can subtract the two dates from each other and then compare to a number. This forces the dates to behave as numbers and not arrarys. As an example,
RFICDAT1-RFICDAT>0

---
#

Example implementation: DM.DATSURG
Goal: 
Query message: Visit 1 must be within 8 weeks after final surgery.

```JavaScript
if(V1.$EVENT.EventDate!=null && DATSURG!=null)
return (V1.$EVENT.EventDate-DATSURG) >= 0 && (V1.$EVENT.EventDate-DATSURG) <= 4838400000;
else return true;
```

This is a complex, inclusive range check to make sure that a surgery is performed after the Visit 1, but no longer than 8 weeks after.  The large number is the number of milliseconds in 8 weeks.

---
#

Example implementation: DM.RFICDAT
Goal: 
Query message: Date of Informed Consent is recorded prior to 31-Dec-2018. Please review and correct.

```JavaScript
var x = new Date(2018, 11, 31);
if (RFICDAT!=null && RFICDAT < x)
return false;
else return true;
```

This check is an example of date being created as an array.  Dates can be handled either as arrays or as the number of milliseconds from 1970 JAN 01 00:00:00
Note also that the months are indexed at zero in JavaScript (i.e JAN = 0, FEB = 1, etc.).

---
#

Example implementation: VS.VSDAT
Goal: 
Query message: Date is not complete. Please correct.

```JavaScript
if(VSDAT!=null)
return VSDAT__format == 0;
else return true;
```

Note the two underscores before the word format.  This is the only example of it that you are likely to encounter.

---
#

Example implementation: LB.LBDAT
Goal: 
Query message: Please confirm collection time at midnight.

```JavaScript
if(LBDAT!=null) {
   return LBDAT.getHours()!=0 || LBDAT.getMinutes()!=0;
}else return true;
```

When you use a combined date/time field it sometimes happens that site staff enters the date, but leave the time at 00:00. If you use this check, it will fire when the time is not actively entered.

---
#

Example implementation: VS.VSTIM
Goal: 
Query message: Time is recorded in future. Please correct.

```JavaScript
if (VSDAT != null && VSDAT.toString() == today().toString() ) {
   if ( VSTIM > now() )
   return false;
   else return true;
} else return true;
```

For date and time fields, there is system functionality to control for future times.  But if only a time field is used, then this check is required to control against entering future times.
We recommend using a combined date/time field when appropriate and with the above check.

---
#

Example implementation: EX.EXENTIM
Goal: 
Query message: Stop time of infusion is not after the Start time. Please correct.

```JavaScript
if(EXENTIM != null && EXSTTIM != null && EXENTIM <= EXSTTIM) {
   return false;
} return true;
```

This check does not work if the times spans across midnight.
The times must be combined with a date in order to control for spans across midnight.  There are examples of this further below.

---
#

Example implementation: DS.DTHDAT
Goal: 
Query message: Date of death is not same as the Date of discontinuation. Please verify.

```JavaScript
if(DTHDAT!=null && DSSTDAT!=null) {
   return days(DTHDAT, DSSTDAT)==0;
} else return true;
```

days is a Viedoc-specific function we've provided that calculates the number of days between two dates.  Thus, if the number of days between the two dates is zero, they must be the same date.
Don't use combined date/time fields with this function.

---
#

Example implementation: AE.AESTDAT
Goal: 
Query message: Start date of adverse event is not on or after the Date of Informed Consent. Please verify.

```JavaScript
if(AESTDAT!=null && NEWPT.DM.RFICDAT!=null) {
   return AESTDAT - NEWPT.DM.RFICDAT >= 0;
} else return true;
```

This check makes sure that a date always occurs after a specific date.  

---
#

Example implementation: AE.AESTDAT
Goal: 
Query message: Start date of adverse event is not on or before the Date of discontinuation in End of Study form. Please verify.

```JavaScript
if(AESTDAT!=null && $LAST.DS.DSSTDAT!=null){
   return AESTDAT - $LAST.DS.DSSTDAT <= 0;
} else return true;
```

$LAST replaces the EventID in this check.  $LAST is a ""wildcard"" that is best used for common events.  In this case, the reference points to the last adverse event entered.  Wildcards are usful, but should be used with caution as they are not specific.  For example, consider what will happen if the user deletes the last adverse event in this case.
ANSWER: check will work as expected, as the previous event will become the new ""last.""

---
#

Example implementation: AE.AEENTIM
Goal: 
Query message: End date and time of adverse event is not on or after the Start date and time. Please correct.

```JavaScript
var a = AEENDAT;
var b = AEENTIM;
var c = AESTDAT;
var d = AESTTIM;
if (a != null && b != null && c != null && d != null){
   var spyr = a.getFullYear();
   var spmon = a.getMonth();
   var spdat = a.getDate();
   var sphr = b.getHours();
   var spmin = b.getMinutes();
   var sp = new Date(spyr, spmon, spdat, sphr, spmin, 00, 00);
   var styr = c.getFullYear();
   var stmon = c.getMonth();
   var stdat = c.getDate();
   var sthr = d.getHours();
   var stmin = d.getMinutes();
   var st = new Date(styr, stmon, stdat, sthr, stmin, 00, 00);
   if (sp <= st) {
      return false;
   } else return true;
} else return true;
```

This check is necessary in situations where the dates and times to compare are collected in separate fields.  Thus, this check first combines them, and then compares them.

---
#

Example implementation: MR.MRDAT
Goal: 
Query message: All MRI visits to be performed at the same time during the day (plus/minus 2 hours)

```JavaScript
var TDAT = new Date(V1.MR.MRDAT);
if(MRDAT && ActivityDefId!=""V1_MR""){
   if(MRDAT.getHours() >= TDAT.getHours()){
      return (
         ((MRDAT.getHours()*60)+MRDAT.getMinutes())-((TDAT.getHours()*60)+TDAT.getMinutes())
         )<=120;
   } else return (
      ((TDAT.getHours()*60)+TDAT.getMinutes())-((MRDAT.getHours()*60)+MRDAT.getMinutes())
      )<=120;
}else return true;
```

This check controls that a specific assessment is always performed within 2 hours from the first time it was entered.  In this example, V1_MR is the activity of the first occurence (i.e. the date that all future measurements will be compared to).

---
#

Example implementation: PK.PKTIM
Goal: 
Query message: Date and time of PK blood collection at this time point is not 2 hours (± 5 minutes) after the Date and time of drug administration in drug administration form. Please verify.

```JavaScript
var a = V1.EX$V1_EX.EXDAT;
var b = V1.EX$V1_EX.EXSTTIM;
if(
      StudyEventDefId == ""V1"" && 
      a != null && b != null && PKDAT != null && PKTIM != null
   ){
   var payr = a.getFullYear();
   var pamnt = a.getMonth();
   var padat = a.getDate();
   var pahr = b.getHours();
   var pamin = b.getMinutes();
   var pa = new Date(payr, pamnt, padat, pahr, pamin, 00, 00);
   var pkyr = PKDAT.getFullYear();
   var pkmnt = PKDAT.getMonth();
   var pkdat = PKDAT.getDate();
   var pkhr = PKTIM.getHours();
   var pkmin = PKTIM.getMinutes();
   var pk = new Date(pkyr, pkmnt, pkdat, pkhr, pkmin, 00, 00);
   if(
      (((pk-pa)/60000) < 115) ||
      (((pk-pa)/60000) > 125) || 
      pk < pa
   ){ return false;
   } else return true;
}
return true;
```

This is a complex check for two separate time items (date not included).  The check adds the year, month, and date parameters to the two times from separate date fields, and then compares these two date arrays with an exclusive range check.
Calculations are performed to set the two time into minutes.
Note that this check also references a specific visit.

---
#

Example implementation: ML.LUNCHDAT
Goal: 
Query message: The lunch time is not after the breakfast time. Please verify.

```JavaScript
if( LUNCHDAT != null && LUNCHTIM != null && BRKFSTDAT != null && BRKFSTTIM != null) {
   var aestyr = LUNCHDAT.getFullYear();
   var aestmnth = LUNCHDAT.getMonth();
   var aedat = LUNCHDAT.getDate();
   var aehr = LUNCHTIM.getHours();
   var aemin = LUNCHTIM.getMinutes();
   var ae = new Date(aestyr,aestmnth,aedat,aehr,aemin,00,00);
   var payr = BRKFSTDAT.getFullYear();
   var pamnth = BRKFSTDAT.getMonth();
   var padat = BRKFSTDAT.getDate();
   var pahr = BRKFSTTIM.getHours();
   var pamin = BRKFSTTIM.getMinutes();
   var pa = new Date(payr,pamnth,padat,pahr,pamin,00,00);
   if (ae <= pa) return false;
   else return true;
} else return true;
```

This check is making sure that a specific time field has a time after another time field.  Year, month, and date parameters are added to the times from related date fields and then the two times are compared.

---
#

Example implementation: ML.DINNTIM
Goal: 
Query message: The dinner time is not after the lunch time and/or the breakfast time. Please verify.

```JavaScript
if(DINNDAT != null && DINNTIM != null){
   var a = null, b = null;
   if(LUNCHDAT != null && LUNCHTIM != null){
      a = LUNCHDAT;
      b = LUNCHTIM;
   } else if(BRKFSTDAT != null && BRKFSTTIM != null && (LUNCHDAT == null || LUNCHTIM == null)){
      a = BRKFSTDAT;
      b = BRKFSTTIM;
   }
   if(a != null && b != null){
      var aestyr = DINNDAT.getFullYear();
      var aestmnth = DINNDAT.getMonth();
      var aedat = DINNDAT.getDate();
      var aehr = DINNTIM.getHours();
      var aemin = DINNTIM.getMinutes();
      var ae = new Date(aestyr,aestmnth,aedat,aehr,aemin,00,00);
      var payr = a.getFullYear();
      var pamnth = a.getMonth();
      var padat = a.getDate();
      var pahr = b.getHours();
      var pamin = b.getMinutes();
      var pa = new Date(payr,pamnth,padat,pahr,pamin,00,00);
      if(ae <= pa){ return false;}
   }
} return true;
```

This check is making sure that a specific time field has a time after 2 other time fields. Year, month, and date parameters are added to the times (from two related date fields) and then the two times are compared.

---
#

Example implementation: IS.ISTIM
Goal: 
Query message: Date and time of sample collection is not within 30 minutes prior to the Date and start time of the drug administration. Please verify.

```JavaScript
function create_date_and_time(day, time){
   var year = day.getFullYear();
   var month = day.getMonth();
   var date = day.getDate();
   var hour = time.getHours();
   var minute = time.getMinutes();
   return (new Date(year, month, date, hour, minute, 00, 00));
}

if(
   StudyEventDefId == ""V1"" && 
   ISTIM != null && ISDAT != null && 
   $THIS.EX.EXDAT != null && 
   $THIS.EX.EXSTTIM != null
){
   var diff = (create_date_and_time($THIS.EX.EXDAT, $THIS.EX.EXSTTIM) - create_date_and_time(ISDAT, ISTIM))/60000;
   if (
      diff < 0 || diff > 30)	{
      return false;
   }
} return true;
```

In this check, a function is created to combine a date item with a time item and then perform a cacluation to compare two separate combinations of date/time items within 30 minutes of each other.

One lesson to learn from these types of checks is that you should using combined date and time fields when appropriate can make your life easier (i.e. doesn't require you to combine two separate fields in code like this).

