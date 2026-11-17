# Gap Analysis Template - [Feature ID] [Feature Name]

## 1. Purpose and scope

Describe the feature, requirement source, test suite, test data, browsers, execution date, and total test executions.

- Feature: `[FR-XX - Feature name]`
- Requirement source: `[README.md / SRS section]`
- Test script: `[path]`
- Test data: `[path]`
- Browsers: `[Chromium / Firefox / WebKit]`
- Execution date: `[YYYY-MM-DD]`
- Result: `[passed] passed, [failed] failed out of [total] executions`

Evidence locations:

- HTML report: `[path]`
- Screenshots/traces: `[path]`
- Bug report: `[path]`

## 2. Expected behavior

Summarize the relevant requirements as observable behaviors. Use numbered points and cite the requirement section where possible.

1. `[Expected behavior 1]`
2. `[Expected behavior 2]`
3. `[Expected behavior 3]`

## 3. Observed gaps

### Gap 1 - [Short defect title]

**Affected test cases:** `[TC IDs]`

**Expected:** `[What the requirement says should happen]`

**Observed:** `[What the test actually observed]`

**Impact:** `[User, business, security, compatibility, or data impact]`

**Evidence:** `[Screenshot, trace, report path, or issue URL]`

**Related defect:** `[BUG-ID and link, if applicable]`

### Gap 2 - [Short defect title]

**Affected test cases:** `[TC IDs]`

**Expected:** `[Expected behavior]`

**Observed:** `[Actual behavior]`

**Impact:** `[Impact]`

**Evidence:** `[Evidence path or URL]`

**Related defect:** `[BUG-ID and link, if applicable]`

## 4. Human review of automation

Describe whether the failure came from the test script, test data, environment, or SUT. Record any locator, wait, assertion, or expected-result changes made after review.

- Initial AI output: `[Summary]`
- Review finding: `[Finding]`
- Student correction: `[Correction]`
- Reason for classification: `[Why this is a script issue or SUT gap]`

## 5. Conclusion

Summarize the main requirement gaps, the number of distinct defects, the remaining limitations, and the next validation step.

## 6. Review checklist

- [ ] Expected behavior is linked to a requirement.
- [ ] Actual behavior is supported by execution evidence.
- [ ] Repeated failures across browsers are grouped by root cause.
- [ ] Script/environment failures are separated from SUT failures.
- [ ] Severity and impact are stated for each defect.
- [ ] Related GitHub Issue URLs are recorded.
- [ ] Screenshots, traces, and HTML reports are stored in the submission evidence folder.