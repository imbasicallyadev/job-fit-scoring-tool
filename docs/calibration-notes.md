# Calibration Method

The first development session focused on calibration rather than interface work.

For each test case:

1. Record the manual/expected verdict.
2. Run the job description through the model.
3. Compare the verdict and dimension-level scores.
4. Inspect why any disagreement occurred.
5. Change the rubric only when the underlying logic is wrong or incomplete.
6. Re-test the original case and other roles to check that the change generalizes.

The goal is not to force the model to reproduce a preferred answer. The goal is to make the scoring logic better reflect the criteria the user actually applies when evaluating opportunities.

Examples of issues found during calibration included qualification gaps being masked by strong company scores, event-heavy roles being over-scored because of developer/community context, and overly brittle verdict caps.
