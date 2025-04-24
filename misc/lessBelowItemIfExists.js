// Example implementation: VS.ORRES_DIABP
// Query message: Diastolic blood pressure is not less than the Systolic blood pressure. Please verify.

if(
   ORRES_SYSBP!=null && 
   ORRES_DIABP!=null && 
   ORRES_DIABP >= ORRES_SYSBP   // references field ORRES_SYSBP from same form
   ) return false;
else return true;

