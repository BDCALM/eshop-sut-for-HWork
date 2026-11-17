# GitHub Issue — BUG-FR19-002

## Title

[FR-19] DELETE /api/admin/users/:id always returns HTTP 200 regardless of ID validity (false success)

## Labels

`bug`, `high`, `backend`, `api`

## Body

### Summary

`DELETE /api/admin/users/:id` returns HTTP 200 `{"message":"User deleted"}` for every request — including:
- Non-existent user IDs (e.g., `999999`)
- Non-numeric / invalid IDs (e.g., `invalid-id-abc`)
- Self-deletion (admin deleting their own account)

The implementation never inspects the number of affected rows in the database, so a no-op delete is indistinguishable from a successful one.

### Environment

- Backend: `http://localhost:3000`
- Affected endpoint: `DELETE /api/admin/users/:id`
- Reproduced on: Chromium, Firefox, WebKit (via Playwright FR19-TC06, TC07, TC08)
- Student ID: 23120242

### Steps to reproduce

**Case A — Non-existent ID:**
```
DELETE http://localhost:3000/api/admin/users/999999
Authorization: Bearer <admin-token>
```
→ HTTP 200 `{"message":"User deleted"}` *(expected: 404)*

**Case B — Invalid (non-numeric) ID:**
```
DELETE http://localhost:3000/api/admin/users/invalid-id-abc
Authorization: Bearer <admin-token>
```
→ HTTP 200 *(expected: 400)*

**Case C — Self-deletion:**
```
DELETE http://localhost:3000/api/admin/users/<own-admin-id>
Authorization: Bearer <own-admin-token>
```
→ HTTP 200 *(expected: 403)*

### Expected results

| Scenario | Expected HTTP Status |
|---|---|
| Non-existent numeric ID | 404 Not Found |
| Non-numeric ID string | 400 Bad Request |
| Admin deletes own account | 403 Forbidden |

### Automated test evidence

- Test cases: `FR19-TC06`, `FR19-TC07`, `FR19-TC08` in `HW4/tests/FR19.spec.js`
- Console: `[DEFECT] DELETE /api/admin/users/999999 trả HTTP 200 với message 'User deleted' dù ID không tồn tại — false success`

### Suspected root cause

`backend/server.js` lines 532-536:
```javascript
app.delete("/api/admin/users/:id", authenticateToken, (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (err) {
    res.json({ message: "User deleted" }); // ← always 200, this.changes never checked
  });
});
```

### Suggested fix

```javascript
app.delete("/api/admin/users/:id", authenticateToken, adminOnly, (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  if (id === req.user.id) return res.status(403).json({ error: 'Cannot delete your own account' });
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});
```

### Impact

- **High** — False-success API responses mislead clients.
- Self-deletion can permanently lock admin out of the system.
- Violates FR-19 requirement: *"Admin có thể xóa người dùng"* (implies valid targets only).
