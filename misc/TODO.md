# Miscellaneous


Example implementation: AE.AESER
Goal: Confirm then when item  X is true, item  'A ' is only true if Checkbox Value B item is selected has a value.
Query message: Outcome is selected as "Fatal", but seriousness criteria is not selected as "Death". Please verify.

```JavaScript
if(
   AEOUT!=null && 
   AEOUT==1 && ((
      AESER!=null && AESER!= 1
      ) || (
      AESER==1 && AESERCAT!=null && AESERCAT!= 0 && !AESERCAT.contains(1)
      )
   )
) return false;
else return true;
ifItemExists&isTrue
```

Example implementation: DM.BRTHYR
Goal: Confirm value is within a range
Query message: Year of birth is not within the expected range. Please verify.
```
BRTHYR >= 1973 && BRTHYR <= 2019
```

This is an example of a standard inclusive range check. Note that this is an edit check in a design where year of birth is entered in a numeric field, and not in a date field.

----
##

Example implementation: VS.ORRES_DIABP
Goal: Confirm value not greater than another value (null checked)
Query message: Diastolic blood pressure is not less than the Systolic blood pressure. Please verify.

```JavaScript
if(
    ORRES_SYSBP!=null && 
    ORRES_DIABP!=null && 
    ORRES_DIABP >= ORRES_SYSBP
    ) return false;
 else return true;
```

It is not required to check for null, but we consider it to be best practice. If you use this check without checking for null, the check would always trigger when systolic blood pressure is missing and diastolic blood pressure has a value. ! means 'not' in JavaScript.
 In this check, and most checks below we have arranged the check with an ""if statement"" with the false expression, i.e. defining the condition that should trigger the check. However, this check could also be written as below: 
 ORRES_SYSBP!=null && ORRES_DIABP!=null && ORRES_DIABP < ORRES_SYSBP
 Note that the check to the left is defining the false expression, whereas the above defines the true expression.
 Note that the last else statement is best as ""else return true;"".  Returning false in the final statement can result in many needless queries if programmed incorrectly.

----
##


Example implementation: CHQ.AEYN
Goal: Confirm there is an existing [adverse events] form
Query message: Subject has experienced new adverse event and/or there was worsening of concomitant diseases and/or there were changes in the reported adverse events, however there is no record in the Adverse Events log. Please verify.
```JavaScript
if(
    AEYN == 1 && 
    $FIRST.AE.AESPID == null
 ) return false;
 else return true;
```

This check is for an item within a visit that checks if a con-med has been added to the common events.  This check assumes there is an item returning the StudyEventRepeatKey as a function (AESPID) in the AE form.
 $FIRST replaces the EventID in this check.  $FIRST is a ""wildcard"" that is best used for common events.  In this case, the reference points to the first Adverse Event.  Wildcards are usful, but should be used with caution as they are not specific.  For example, consider what will happen if the user deletes the first Adverse Event in this case.
 ANSWER: check will work as expected, as the next event will become the new ""first.""

----
##


Example implementation: AE.AESER
Goal: Confirm then when item  X is true, item  'A ' is only true if Checkbox  item 'B '  has  a value
Query message: Outcome is selected as ""Fatal"", but seriousness criteria is not selected as ""Death"". Please verify.
```JavaScript
if(
    AEOUT!=null && 
    AEOUT==1 && ((
       AESER!=null && AESER!= 1
       ) || (
       AESER==1 && AESERCAT!=null && AESERCAT!= 0 && !AESERCAT.contains(1)
       )
    )
 ) return false;
 else return true;
```

In this design;
 AEOUT = AE Outcome, where 1 = Fatal
 AESER = AE Serious, where 1 = Yes
 AESERCAT = AE Seriousness Criteria, where 1 = Death
 Note the use of parentheses && and ||
 The first part checks that outcome is not selected as ""Fatal"" at the same time as Serious is ""NO"".
 The second part checks if Outcome = ""Fatal"", Serious = ""YES"" and seriousness criteria contains ""Death""
 Also note the use of the exclamation mark, ! means ""not"" in JavaScript.

----
##


Example implementation: DM.DMINIT
Goal: Confirm value is in the form 'XXX' or 'X-X', where X is any upper case alphabetic character
Query message: Subject initials are not in the expected format. Please correct.
```JavaScript
var regExp = /^[A-Z]([A-Z]|[-])[A-Z]$/
 if (DMINIT != null  ){
    return regExp.test(DMINIT)==true;
 } else return true;
```

This check uses a logical grammar/language called a ""regular expression"" (aka RegEx). The first line creates the regular expression to check, and the second like tests of the item entry passes or fails the RegEx's conditions.
 RegEx can be used to control many types of complex entries or program alerts.
 There are many online tutorials and ""cheat sheets"" to help interpret and program these checks.
 This RegEx expects a capital letter as the first character, another capital letter or hyphen as the middle character, and a final capital letter at the end.
 Checks using RegEx should only be used in free-text fields, as Viedoc already has system functionality to control the entry and format of the other item types.

----
##


Example implementation: AE.IMG
Goal: Confirm uploaded file name does not contain symbols which may cause silent errors 
Query message: Contains illegal character. File name cannot contain the following symbols: ! "" # % ^ & * ( ) + = { } [ ] ' "" ` < > \ / |
 Note that the following characters are not included in the check:  : ; . ,  -

```JavaScript
if (IMG != null) {
    const regExp = /[!@#$%^&*()\+={}[\]""'`<>?\/|\\]/;
    return ! regExp.test(IMG.FileName)
 } else return true;
```

Another RegEx that makes sure that only ASCII characters are used. 
The use of some symbols cause errors in code. For example, if code uses single quotes to show that something is free text, if the free text contains an apostrophe, the computer will think that the apostrophe is the end of the free text, and tries to interpret what comes after the apostrophe as code, not as part of the name.
It can be difficult to write a check for this, as the symbols you need to check for have meaning when you are writing the check and you have to 'escape' them correctly, so that the computer knows not to interpret them.
Note the exclamation mark in the second line. ! means 'not' in JavaScript.

----
##


Example implementation: AE.AECOVAL
Goal: Confirm value contains base ASCII characters
Query message: Contains illegal character.

```JavaScript
var regExp = /[^\x20-\x7F]+/;
 if(AECOVAL!=null) {return !regExp.test(AECOVAL);
 } else return true;
```

Another RegEx that makes sure that only standard ASCII characters are used (using hex references for indeces 48-127). Note the exclamation mark in the second line. '!' means 'not' in JavaScript. '^' inside angle brackets means 'does not contain the bracketed sequence' in a regular experession.
 ASCII reference:
 control characters: 0-31 e.g. Shift, acknowledge, end if transmission, etc.
 numerals 0-9: 48-57.   uppercase A-Z: 65-90   lowercase a-z: 97-122   symbols: 32-47, 58-64, 91-96, 123-127
 Extended ASCII codes (character code 128-255) which contain diacritics are not included

----
##


Example implementation: AE.AETERM
Goal: Confirm conains only upper or lowercase a-Z or numbers and ends
Query message: Only letters and numbers are allowed.

```JavaScript
var regExp = /^[A-Za-z0-9 ]*[A-Za-z0-9 ][A-Za-z0-9 ]*$/;
 if(AETERM!=null) return regExp.test(AETERM);
 else return true;
```

Another RegEx that makes sure only letters and numbers are used. Letters like Å, Ä and Ö are not allowed. Note the exclamation mark in the second line.
 Redundancy in this check - equavelent to /^[A-Za-z0-9]*$/
 ! means 'not' in JavaScript.

----
##


Example implementation: PK.PKKIT
Goal: Confirm only n digits
Query message: Four-digit number expected.

```JavaScript
var regExp = /\d{4}/;
 if(PKKIT!=null) {
    return regExp.test(PKKIT)==true && PKKIT.length==4;
 } else return true;
```

Another example of a RegEx check.  As a reminder, RegEx should only be used in free-text fields.  This check tests that the entry is exactly a 4-digit number.
 The item.length==4 is mostly extraneous, but controls for things like line breaks, so it could be useful to have. 

----
##


Example implementation: ISR.ISRPRE
Goal: Confirm file size under threshold
Query message: File too big.

```JavaScript
if(ISRPRE!=null) {
    return ISRPRE.FileSize<100000;
 } else return true;
```

This check controls for the file size.  The large number is the exact number of bytes.

----
##


Example implementation: ISR.ISRPOST
Goal: Confirm uploaded file is different to other file
Query message: Images are the same.

```JavaScript
if(ISRPRE!=null && ISRPOST!=null
 ) return ISRPOST.FileHash!=ISRPRE.FileHash;
```

This check tests if the same image has been uploaded for both the pre- and post-dose upload field. Each file uploaded is given a unique ""hash"" code which can be used to uniquely identify and compare the image.

----
##


Example implementation: LB.ORRES_HGB
Goal: Confirm value is less than x times the upper value of a range item (extremely large)
Query message: Result greater than 3x upper limit.  Fails exclusion criteria.

```JavaScript
if (ORRES_HGB!= null && ORNR_HGB!=null) {
    return ORRES_HGB <= parseRangeValue(ORNR_HGB).Upper * 3;
 } else return true;
```

There are several properties in a range item that can be parsed out and used for edit checks.  In this check, we use the upper limit of the range to write a check controlling for extreme values above the upper limit (3 times greater in this case).

----
##


Example implementation: LB.ORRES_HGB
Goal: Confirm value is greater than the lower value of a range item divided by x (extremely small)
Query message: Result less than 3x lower limit.  Fails exclusion criteria.

```JavaScript
if (ORRES_HGB!= null && ORNR_HGB!=null) {
    return ORRES_HGB >= parseRangeValue(ORNR_HGB).Lower / 3;
 } else return true;
```

There are several properties in a range item that can be parsed out and used for edit checks.
 parseRangeValue() gets the value of the range item as a JS object rather than text.
  In this check, we use the lower limit of the range to write a check controlling for extreme values under the lower limit (3 times lower in this case).

----
##


Example implementation: CHQ.PZCHK
Goal: Confirm 'none of the above'. i.e. only one value is checked
Query message: Illogical!  'None of the above' is selected along with other entries.

```JavaScript
if(PZCHK!=null && PZCHK.contains(99))
 return !PZCHK.contains(1) && !PZCHK.contains(2) && !PZCHK.contains(3);
 else return true;
 if(
    PZCHK!=null && PZCHK.contains(99)
 ) return !(PZCHK.length != 1);
 else return true;
```

This a check for a checkbox item that has 'none of the above' as an option.  If this option is checked, none of the other options should be checked.  Note the use of the ! which means 'not'.  The middle part of the check must include all the other options in the checkbox.  This example has only 3 other options.  'none of the above' had the codelist of 99.

----
##


Example implementation: VS.VSPERF
Goal: Confirm has value of x if patient has certain features
Query message: Vital signs is required for patients in cohorts 2 and 3.

```JavaScript
if(
    VSPERF!=null && 
    StudyEventDefId == "V2" && 
    (
       NEWPT.DM.COHORT == 2 || NEWPT.DM.COHORT ==3
    )
 ) return VSPERF==1;
 else return true;
```

This check is an example of how to limit a check to a specific visit (e.g. using the StudyEventDefId in the if statement).
 
 ActivityDefId can be used in the same way to limit a check to a specific activity.

----
##


Example implementation: IE.IEYN
Goal: Confirm has value of 'X' when Item A is greater than 'Y' or null 
Query message: Subject weight is not confirmed as ≤ 80kg, but the subject is checked as eligible. Please verify.

```JavaScript
if (
    IEYN != null &&
    V1.VS.ORRES_WEIGHT == null || 
    V1.VS.ORRES_WEIGHT>80
 ) return IEYN==0;
 else return true;
```

This check is used to confirm that eligibility criteria are entered consistantly in different forms, in this case the VS form and the IE form.
 A simpler option is to add the check in the VS form itself to trigger when the weight is greater than 80kg, but such a check would trigger for all subjects, also screening failures. Our example would only trigger when the weight is greater than 80 AND the subject is entered as eligible.

----
##


Example implementation: DM.BRTHYR
Goal: Confirm value is within a range
Query message: Year of birth is not within the expected range. Please verify.

```JavaScript
BRTHYR >= 1973 && BRTHYR <= 2019
```

This is an example of a standard inclusive range check. Note that this is an edit check in a design where year of birth is entered in a numeric field, and not in a date field.

----
##

Example implementation: VS.ORRES_DIABP
Goal: Confirm value not greater than another value (null checked)
Query message: Diastolic blood pressure is not less than the Systolic blood pressure. Please verify.

```JavaScript
if(
   ORRES_SYSBP!=null && 
   ORRES_DIABP!=null && 
   ORRES_DIABP >= ORRES_SYSBP
   ) return false;
else return true;
```

It is not required to check for null, but we consider it to be best practice. If you use this check without checking for null, the check would always trigger when systolic blood pressure is missing and diastolic blood pressure has a value. ! means 'not' in JavaScript.
In this check, and most checks below we have arranged the check with an ""if statement"" with the false expression, i.e. defining the condition that should trigger the check. However, this check could also be written as below: 
ORRES_SYSBP!=null && ORRES_DIABP!=null && ORRES_DIABP < ORRES_SYSBP
Note that the check to the left is defining the false expression, whereas the above defines the true expression.
Note that the last else statement is best as ""else return true;"".  Returning false in the final statement can result in many needless queries if programmed incorrectly.

----
##

Example implementation: CHQ.AEYN
Goal: Confirm there is an existing [adverse events] form
Query message: Subject has experienced new adverse event and/or there was worsening of concomitant diseases and/or there were changes in the reported adverse events, however there is no record in the Adverse Events log. Please verify.
```
if(
   AEYN == 1 && 
   $FIRST.AE.AESPID == null
) return false;
else return true;
```

This check is for an item within a visit that checks if a con-med has been added to the common events.  This check assumes there is an item returning the StudyEventRepeatKey as a function (AESPID) in the AE form.
$FIRST replaces the EventID in this check.  $FIRST is a ""wildcard"" that is best used for common events.  In this case, the reference points to the first Adverse Event.  Wildcards are usful, but should be used with caution as they are not specific.  For example, consider what will happen if the user deletes the first Adverse Event in this case.
ANSWER: check will work as expected, as the next event will become the new ""first.""

----
##

Example implementation: AE.AESER 
Goal: Confirm then when item  X is true, item  'A ' is only true if Checkbox  item 'B '  has  a value
Query message: Outcome is selected as ""Fatal"", but seriousness criteria is not selected as ""Death"". Please verify.

```JavaScript
if(
   AEOUT!=null && 
   AEOUT==1 && ((
      AESER!=null && AESER!= 1
      ) || (
      AESER==1 && AESERCAT!=null && AESERCAT!= 0 && !AESERCAT.contains(1)
      )
   )
) return false;
else return true;
```

In this design;
AEOUT = AE Outcome, where 1 = Fatal
AESER = AE Serious, where 1 = Yes
AESERCAT = AE Seriousness Criteria, where 1 = Death
Note the use of parentheses && and ||
The first part checks that outcome is not selected as ""Fatal"" at the same time as Serious is ""NO"".
The second part checks if Outcome = ""Fatal"", Serious = ""YES"" and seriousness criteria contains ""Death""
Also note the use of the exclamation mark, ! means ""not"" in JavaScript.

----
##

Example implementation: DM.DMINIT
Goal: Confirm value is in the form 'XXX' or 'X-X', where X is any upper case alphabetic character
Query message: Subject initials are not in the expected format. Please correct.

```JavaScript
var regExp = /^[A-Z]([A-Z]|[-])[A-Z]$/
if (DMINIT != null  ){
   return regExp.test(DMINIT)==true;
} else return true;
```

This check uses a logical grammar/language called a ""regular expression"" (aka RegEx). The first line creates the regular expression to check, and the second like tests of the item entry passes or fails the RegEx's conditions.
RegEx can be used to control many types of complex entries or program alerts.
There are many online tutorials and ""cheat sheets"" to help interpret and program these checks.
This RegEx expects a capital letter as the first character, another capital letter or hyphen as the middle character, and a final capital letter at the end.
Checks using RegEx should only be used in free-text fields, as Viedoc already has system functionality to control the entry and format of the other item types.

----
##

Example implementation: AE.IMG
Goal: Confirm uploaded file name does not contain symbols which may cause silent errors 
Query message: Contains illegal character. File name cannot contain the following symbols: ! "" # % ^ & * ( ) + = { } [ ] ' "" ` < > \ / |
Note that the following characters are not included in the check:  : ; . ,  -

```JavaScript
if (IMG != null) {
   const regExp = /[!@#$%^&*()\+={}[\]""'`<>?\/|\\]/;
   return ! regExp.test(IMG.FileName)
} else return true;
```

Another RegEx that makes sure that only ASCII characters are used. 
The use of some symbols cause errors in code. For example, if code uses single quotes to show that something is free text, if the free text contains an apostrophe, the computer will think that the apostrophe is the end of the free text, and tries to interpret what comes after the apostrophe as code, not as part of the name.
It can be difficult to write a check for this, as the symbols you need to check for have meaning when you are writing the check and you have to 'escape' them correctly, so that the computer knows not to interpret them.
Note the exclamation mark in the second line. ! means 'not' in JavaScript.

----
##

Example implementation: AE.AECOVAL
Goal: Confirm value contains base ASCII characters
Query message: Contains illegal character.

```JavaScript
var regExp = /[^\x20-\x7F]+/;
if(AECOVAL!=null) {return !regExp.test(AECOVAL);
} else return true;
```

Another RegEx that makes sure that only standard ASCII characters are used (using hex references for indeces 48-127). Note the exclamation mark in the second line. '!' means 'not' in JavaScript. '^' inside angle brackets means 'does not contain the bracketed sequence' in a regular experession.
ASCII reference:
control characters: 0-31 e.g. Shift, acknowledge, end if transmission, etc.
numerals 0-9: 48-57.   uppercase A-Z: 65-90   lowercase a-z: 97-122   symbols: 32-47, 58-64, 91-96, 123-127
Extended ASCII codes (character code 128-255) which contain diacritics are not included

----
##

Example implementation: AE.AETERM
Goal: Confirm conains only upper or lowercase a-Z or numbers and ends
Query message: Only letters and numbers are allowed.

```JavaScript
var regExp = /^[A-Za-z0-9 ]*[A-Za-z0-9 ][A-Za-z0-9 ]*$/;
if(AETERM!=null) return regExp.test(AETERM);
else return true;
```

Another RegEx that makes sure only letters and numbers are used. Letters like Å, Ä and Ö are not allowed. Note the exclamation mark in the second line.
Redundancy in this check - equavelent to /^[A-Za-z0-9]*$/
! means 'not' in JavaScript.

----
##

Example implementation: PK.PKKIT
Goal: Confirm only n digits
Query message: Four-digit number expected.

```JavaScript
var regExp = /\d{4}/;
if(PKKIT!=null) {
   return regExp.test(PKKIT)==true && PKKIT.length==4;
} else return true;
```

Another example of a RegEx check.  As a reminder, RegEx should only be used in free-text fields.  This check tests that the entry is exactly a 4-digit number.
The item.length==4 is mostly extraneous, but controls for things like line breaks, so it could be useful to have. 

----
##

Example implementation: ISR.ISRPRE
Goal: Confirm file size under threshold
Query message: File too big.

```JavaScript
if(ISRPRE!=null) {
   return ISRPRE.FileSize<100000;
} else return true;
```

This check controls for the file size.  The large number is the exact number of bytes.

----
##

Example implementation: ISR.ISRPOST
Goal: Confirm uploaded file is different to other file
Query message: Images are the same.

```
if(ISRPRE!=null && ISRPOST!=null
) return ISRPOST.FileHash!=ISRPRE.FileHash;
```

This check tests if the same image has been uploaded for both the pre- and post-dose upload field. Each file uploaded is given a unique ""hash"" code which can be used to uniquely identify and compare the image.

----
##

Example implementation: LB.ORRES_HGB
Goal: Confirm value is less than x times the upper value of a range item (extremely large)
Query message: Result greater than 3x upper limit.  Fails exclusion criteria.
```
if (ORRES_HGB!= null && ORNR_HGB!=null) {
   return ORRES_HGB <= parseRangeValue(ORNR_HGB).Upper * 3;
} else return true;
```

There are several properties in a range item that can be parsed out and used for edit checks.  In this check, we use the upper limit of the range to write a check controlling for extreme values above the upper limit (3 times greater in this case).

----
##

Example implementation: LB.ORRES_HGB
Goal: Confirm value is greater than the lower value of a range item divided by x (extremely small)
Query message: Result less than 3x lower limit.  Fails exclusion criteria.

```JavaScript
if (ORRES_HGB!= null && ORNR_HGB!=null) {
   return ORRES_HGB >= parseRangeValue(ORNR_HGB).Lower / 3;
} else return true;
```

There are several properties in a range item that can be parsed out and used for edit checks.
parseRangeValue() gets the value of the range item as a JS object rather than text.
 In this check, we use the lower limit of the range to write a check controlling for extreme values under the lower limit (3 times lower in this case).

----
##


Example implementation: CHQ.PZCHK
Goal: Confirm 'none of the above'. i.e. only one value is checked
Query message: Illogical!  'None of the above' is selected along with other entries.

```JavaScript
if(PZCHK!=null && PZCHK.contains(99))
return !PZCHK.contains(1) && !PZCHK.contains(2) && !PZCHK.contains(3);
else return true;
if(
   PZCHK!=null && PZCHK.contains(99)
) return !(PZCHK.length != 1);
else return true;
```

This a check for a checkbox item that has 'none of the above' as an option.  If this option is checked, none of the other options should be checked.  Note the use of the ! which means 'not'.  The middle part of the check must include all the other options in the checkbox.  This example has only 3 other options.  'none of the above' had the codelist of 99.

----
##

Example implementation: VS.VSPERF
Goal: Confirm has value of x if patient has certain features
Query message: Vital signs is required for patients in cohorts 2 and 3.

```JavaScript
if(
   VSPERF!=null && 
   StudyEventDefId == "V2" && 
   (
      NEWPT.DM.COHORT == 2 || NEWPT.DM.COHORT ==3
   )
) return VSPERF==1;
else return true;
```

This check is an example of how to limit a check to a specific visit (e.g. using the StudyEventDefId in the if statement).

ActivityDefId can be used in the same way to limit a check to a specific activity.

----
##

Example implementation: IE.IEYN
Goal: Confirm has value of 'X' when Item A is greater than 'Y' or null 
Query message: Subject weight is not confirmed as ≤ 80kg, but the subject is checked as eligible. Please verify.

```JavaScript
if (
   IEYN != null &&
   V1.VS.ORRES_WEIGHT == null || 
   V1.VS.ORRES_WEIGHT>80
) return IEYN==0;
else return true;
```

This check is used to confirm that eligibility criteria are entered consistantly in different forms, in this case the VS form and the IE form.
A simpler option is to add the check in the VS form itself to trigger when the weight is greater than 80kg, but such a check would trigger for all subjects, also screening failures. Our example would only trigger when the weight is greater than 80 AND the subject is entered as eligible.

 
