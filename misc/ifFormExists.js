// Example implementation: CHQ.AEYN
/* Query message: Subject has experienced new adverse event and/or there
 was worsening of concomitant diseases and/or there were changes 
in the reported adverse events,
however there is no record in the Adverse Events log. 
Please verify. */

if(
   AEYN == 1 && 
   $FIRST.AE.AESPID == null
) return false;
else return true;
