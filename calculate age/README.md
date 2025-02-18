# Age Calculation Function for Viedoc

This JavaScript function calculates the exact age (in whole numbers) of a subject based on their birth date and a reference date in Viedoc.

## Usage

The function determines the subject's age at the reference date (`RFICDAT`) using the birth date (`BRTHDAT`). It ensures accurate age calculation by adjusting for whether the subject's birthday has passed in the reference year.

## Considerations

-   Ensure that both `BRTHDAT` and `RFICDAT` are provided before calling the function.
-   If using the **Reference Data** feature, be cautious of age values that fall between predefined ranges. For example, an age of **18.5** could be between the ranges **0-18** and **19-45**, which might cause unexpected behavior.

## Further Reading

For more details on JavaScript functions in Viedoc, see the [Viedoc Designer User Guide](https://www.viedoc.com/) or refer to the **Using JavaScript in Viedoc** lesson.
