var ret; // Variable to store the calculated age

// Check if both birth date (BRTHDAT) and reference date (RFICDAT) are available
if (BRTHDAT != null && RFICDAT != null) {
    // Ensure the birth date is not after the reference date
    if (BRTHDAT <= RFICDAT) {
        // Initial age calculation: Difference in years minus 1 (to be adjusted later)
        ret = RFICDAT.getFullYear() - BRTHDAT.getFullYear() - 1;

        // Adjust the age if the birth date has passed in the reference year
        if (
            BRTHDAT.getMonth() < RFICDAT.getMonth() || // Birth month is earlier in the year
            (RFICDAT.getMonth() == BRTHDAT.getMonth() && // Same birth month, check the day
                BRTHDAT.getDate() <= RFICDAT.getDate())
        ) {
            ret++; // Increase age if the birthday has passed
        }
    }

    return ret; // Return the calculated age
}

// Return null if either date is missing
return null;
