// Check if either START or END is missing/null, return null if so
if (!START || !END) return null;

// Calculate the difference in time (milliseconds) between END and START
var diff = (END - START) / (1000 * 60); // Convert milliseconds to minutes

// Return the time difference in minutes
return diff;
