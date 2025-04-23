// Check if either START or END is missing/null, return null if so
if (!START || !END) return null;

// Calculate the total minutes from the start of the day for both START and END
var diffInMinutes =
    END.getHours() * 60 +
    END.getMinutes() - // Convert END time to total minutes
    (START.getHours() * 60 + START.getMinutes()); // Convert START time to total minutes

// Return the difference in minutes
return diffInMinutes;
