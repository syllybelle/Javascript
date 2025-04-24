# Debugging edit checks and function, and common gotchas

### Using full item address for an item on the same form 
When addressing the item a function or edit check is calculated on, or another item in the same form, do not use the full 'EventID.FormID.ItemID' reference path. Using the full reference path will result in the check only firing on form save, not during data capture.

Example: Edit check for VS.HR:
```JavaScript
BASELINE.VS.HR < 100
// should be:
HR < 100
```

### Incorrect bracketing in TRUE/FALSE boolean logic
Example: Edit check for ECG.ECGYN: Confirm tachycardia.
```JavaScript
if (
  StudyEventDefId == "V2" && 
  NEWPT.DM.PVER == 2 || 
  NEWPT.DM.PVER ==3
) return ECGYN==1;
else return true;
//should be 
if (
    StudyEventDefId == "V2" && (
        NEWPT.DM.PVER_WKRT == 2 || NEWPT.DM.PVER ==3
        )
    ) return ECGYN==1;
else return true;
```

`(false && true || true)`   -> evaluates as true
`(false && (true || true))` -> evaluates as false

### Incorrect default if conditions are not met
The default result should be 'true'. 
It can be automatic/intuitive to write a statement thinking that the error will fire when the condition is **true**, but convention requires that the query message is returned if the condition evaluates to **false**. This is so that if any value other than "false" is returned, the query message will not be displayed.

Example: Edit check for ABT.ABTORRES: Alcohol breath test result is Positive; this would result in violation of exclusion criterion #13. Please verify.
```JavaScript
if(
   ABTORRES != null && ABTORRES == 1
) return true;
else return false;

// should be 
if(ABTORRES == 1) return false;
```
`ABTORRES != null` will always be true when the value is 1.
 `'else return true;'`  is implied.

