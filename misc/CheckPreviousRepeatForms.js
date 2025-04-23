//this check is used when checking if a date on a repeating form comes later compared to the previously saved forms
switch (StudyEventDefId){
    case "SCREEN": 
        {
        switch (FormRepeatKey){
            case "1":
            return true;
			break;
            case "2":
            return (PZDATE - date(SCREEN.PZ[1].PZDATE)) >= 0;
			break;
            case "3":
            return (PZDATE - date(SCREEN.PZ[2].PZDATE)) >= 0;
            break;
			case "4":
            return (PZDATE - date(SCREEN.PZ[3].PZDATE)) >= 0;                                                                       
            }
        }
        break;
    case "BASELINE": 
        {
        switch (FormRepeatKey){
            case "1":
            return true;
            break;
			case "2":
            return (PZDATE - date(BASELINE.PZ[1].PZDATE)) >= 0;
            break;
			case "3":
            return (PZDATE - date(BASELINE.PZ[2].PZDATE)) >= 0;
            break;
			case "4":
            return (PZDATE - date(BASELINE.PZ[3].PZDATE)) >= 0;
            }
        }
        break;
}
return true;