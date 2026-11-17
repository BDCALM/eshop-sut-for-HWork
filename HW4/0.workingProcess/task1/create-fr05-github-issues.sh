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
