# Time Difference Calculation in Viedoc

Here you can finc two examples of JavaScript functions for calculating the difference between two time variables in Viedoc.

## Usage

The functions calculate the difference between a **Start time** (`START`) and a **Stop time** (`END`), returning the result in minutes.

### Method 1: Using Milliseconds Difference

[View the script](./time-diff-v1.js)

### Method 2: Using Hours and Minutes

This approach converts `START` and `END` into total minutes since midnight and calculates the difference

[View the script](./time-diff-v2.js)

## Considerations

-   Ensure that both `START` and `END` are provided before executing the function.
-   In JavaScript, time values cannot exist without a date. When selecting a time in Viedoc, the system automatically assigns the current site date.
-   These functions assume that `END` and `START` are on the same day. If `END` is on the next day, additional logic is required.

## Further Reading

For more details on using JavaScript functions in Viedoc, see the [Viedoc Designer User Guide](https://www.viedoc.com/) or refer to the **Using JavaScript in Viedoc** lesson.
