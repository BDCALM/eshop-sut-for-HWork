# GitHub CLI script - FR-05 issues

This Bash script creates three GitHub Issues from the confirmed FR-05 failures. Run it from the repository root in GitHub Codespaces after authenticating with `gh auth login`.

The GitHub CLI does not attach local PNG binaries directly through `gh issue create`. The script includes the exact local evidence path in each issue body. After creation, upload the matching `test-failed-1.png` to the issue using GitHub's image attachment UI, then paste the generated issue URL into `HW4/Submission/reports/bug-report.md`.

## Run

```bash
cd /workspaces/eshop-sut-for-HWork
chmod +x HW4/0.workingProcess/task1/create-fr05-github-issues.sh
HW4/0.workingProcess/task1/create-fr05-github-issues.sh
```

## Script

Save the following content as `HW4/0.workingProcess/task1/create-fr05-github-issues.sh` if the executable file is needed:

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO="${GH_REPO:-$(gh repo view --json nameWithOwner --jq '.nameWithOwner')}"
ROOT="$(git rev-parse --show-toplevel)"
EVIDENCE="$ROOT/HW4/test-results/FR05"

require_file() {
  if [[ ! -f "$1" ]]; then
    echo "Missing evidence file: $1" >&2
    exit 1
  fi
}

create_issue() {
  local issue_id="$1"
  local title="$2"
  local evidence_path="$3"
  local body_file
  body_file="$(mktemp)"

  require_file "$evidence_path"

  cat > "$body_file" <<EOF
## Summary

Confirmed FR-05 SUT defect: $issue_id.

## Reproduction

Run the data-driven Playwright suite:

    npx playwright test tests/FR05.spec.js --project=chromium

The failure was reproduced on Chromium, Firefox, and WebKit. Overall FR-05 execution result: 21 passed, 15 failed. The repeated failures represent this same defect across browsers.

## Evidence to upload

Upload this screenshot to the issue after creation:

    $evidence_path

The local screenshot is not automatically embedded by GitHub CLI. Drag and drop the file into the issue description or add it in a follow-up comment.

## Test case

See `HW4/tests/data/FR05-data.json` and `HW4/Submission/reports/bug-report.md` for the expected and actual results.

## Student ID

23120242
EOF

  echo "Creating $issue_id in $REPO"
  gh issue create --repo "$REPO" --title "$title" --body-file "$body_file"
  rm -f "$body_file"
}

create_issue \
  "BUG-FR05-001" \
  "[FR-05] Missing empty state when product search returns zero results" \
  "$EVIDENCE/FR05-FR05-TC06-Hiển-thị-empty-state-khi-không-có-kết-quả-chromium/test-failed-1.png"

create_issue \
  "BUG-FR05-002" \
  "[FR-05] Search query is rendered as HTML instead of escaped text" \
  "$EVIDENCE/FR05-FR05-TC10-Hiển-thị-an-toàn-từ-khóa-có-thẻ-HTML-chromium/test-failed-1.png"

create_issue \
  "BUG-FR05-003" \
  "[FR-05] Percent wildcard returns all products instead of literal search" \
  "$EVIDENCE/FR05-FR05-TC12-Xử-lý-ký-tự-39676-hư-một-từ-khóa-thông-thường-chromium/test-failed-1.png"
```

## After the script finishes

1. Copy the three URLs printed by `gh issue create`.
2. Upload the matching screenshot to each issue.
3. Replace the three `REPLACE-BUG-FR05-*` URL placeholders in `HW4/Submission/reports/bug-report.md`.
4. Record the final issue URLs in the HW04 report and GitHub commit evidence.

The script intentionally does not modify the SUT. These issues describe observed behavior and leave remediation to the SUT owner.
