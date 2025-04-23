//use this check for when prefixes are used in lab results
//example, tests if a lab result of <5 is within range of 3 to 7
if (LBRHCT != null && LBHCT != null && LBPREHCT != null)
{   var range = parseRangeValue(LBRHCT);
    var res = LBHCT;
        var resr = LBPREHCT;
    
        if (range.Comparator == "InclusiveInBetween")
        {
                  if (resr == "3")
               {
                      if (res > range.Lower)
                      {return false;}
                      else return true;
               }
               else if (resr == "2")
               {
                      if (res < range.Upper)
                      {return false;}
                      else return true;
               }
               else if (resr == "1")
               {
                      if (res >= range.Lower && res <= range.Upper)
                      {return false;}
                      else return true;
               }
              else return false;
        }
        
        else if (range.Comparator == "LessThan" && (resr == "2" || resr == "1"))
        {
                         if (res < range.Upper)
                     {return false;}
                     else return true;               
        }
        
        else if (range.Comparator == "LessThanOrEqualTo")
        {
                  if (resr == "2")
               {
                      if (res < range.Upper)
                      {return false;}
                      else return true;
               }
                  if (resr == "1")
               {
                      if (res <= range.Upper)
                      {return false;}
                      else return true;
               }
           else return false;
        }
        
    else if (range.Comparator == "GreaterThan" && (resr == "1" || resr == "3"))
        {
                          if (res > range.Lower)
                      {return false;}
                      else return true;                 
        }
        
        else if (range.Comparator == "GreaterThanOrEqualTo")
        {
                  if (resr == "1")
               {
                       if (res >= range.Lower)
                       {return false;}
                       else return true;
               }
                  if (resr == "3")
               {
                       if (res > range.Lower)
                       {return false;}
                       else return true;
               }
               else return false;
        }
        
        else if (range.Comparator == "EqualTo" && resr == "1")
        {
                  if (res == range.Lower)
                  {return false;}
                  else return true;
        }
        
        else return false;
}
else return false;
