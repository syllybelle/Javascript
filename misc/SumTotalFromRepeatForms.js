//this code calculates a running total from a number field on a repeating form
switch(StudyEventDefId)
{
       case "SCREEN":
       {
              switch(FormRepeatKey)
              {
                    case "1": return PZNUM;
					break;
					case "2": return PZNUM+SCREEN.PZ[1].PZNUM;
					break;
                    case "3": return PZNUM+SCREEN.PZ[1].PZNUM+SCREEN.PZ[2].PZNUM;
                    break;
					case "4": return PZNUM+SCREEN.PZ[1].PZNUM+SCREEN.PZ[2].PZNUM+SCREEN.PZ[3].PZNUM;// and so on...
              }
       }
	   break;
             // Then next visit...
       case "BASELINE":
       {
              switch(FormRepeatKey)
              {
                    case "1": return PZNUM;
					break;
					case "2": return PZNUM+BASELINE.PZ[1].PZNUM;
					break;
                    case "3": return PZNUM+BASELINE.PZ[1].PZNUM+BASELINE.PZ[2].PZNUM;
                    break;
					case "4": return PZNUM+BASELINE.PZ[1].PZNUM+BASELINE.PZ[2].PZNUM+BASELINE.PZ[3].PZNUM;// and so on...
              }
       }
	   break;
}