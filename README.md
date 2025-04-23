# Viedoc JavaScript Library

This repository contains JavaScript functions, edit checks, and visibility conditions designed for use in **Viedoc**.

The edit checks in the edit-checks folder are primarily designed on the Example edit checks ODM These can be copied and used in your builds, but please ensure the logic, IDs and query message is updated to suit your study. You can make modifications to the code in this design to make them fit other forms and items as well, e.g. the range checks could be used for any form with numerical values, not just vital signs form as in our first examples. We have used examples with realistic FormIDs, EventIDs and ItemIDs, but in a few cases simplified the IDs to make the document easier to read. Please also note that the forms and visits were designed with the sole purpose to demonstrate the edit checks, so the forms themselves are shortened and simplified. 

## Available Scripts

### 1. Age Calculation Function

A function to calculate a subject's exact age based on their birth date and a reference date.

[`View`](./calculate%20age/README.md)

### 2. Time Difference Calculation

A function to calculate the difference between two time variables in minutes.

[`View`](./time%20diff/README.md)

### 3. Misc
A miscellaneous collection of edit checks

## How to Use

1. Browse the repository for relevant scripts.
2. Copy and modify the functions as needed for your Viedoc implementation. If you are uncertain of the usage, upload the [Study Design](./StudyDesign_Example_edit_checks_1.xml) in **Viedoc Designer** to view the implementation
3. Always test scripts before deployment in a production environment.

## Contributing

Contributions and improvements are welcome! If you have suggestions, create an issue or submit a pull request.

## Disclaimer

These scripts are provided **as-is** and should be validated according to your study requirements before use.
