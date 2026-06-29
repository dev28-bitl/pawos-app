# Local Change Log

Purpose: Keep a local record of all changes and provide a quick way to revert to any recorded point.

Repository: d:/native
Branch: pawos
Baseline commit when this file was created: e2c3a47

## How To Use

- Add one entry every time a change is completed.
- Prefer creating a commit for each checkpoint so revert is exact and safe.
- Use the provided revert commands in each entry.

## Entry Template

Copy this block for each new change:

```md
## [YYYY-MM-DD HH:mm] <short title>

- Type: feat | fix | refactor | style | chore
- Author: <name>
- Branch: <branch>
- Files changed:
  - path/to/file1
  - path/to/file2
- Summary:
  - <what changed>
  - <why>

### Checkpoint
- Before commit: <short-hash or N/A>
- After commit: <short-hash or N/A>

### Revert
- Revert this entry (if committed):
  - git revert <after-commit-hash>
- Restore working tree to this exact point (destructive):
  - git reset --hard <after-commit-hash>

### Notes
- <extra notes / testing>
```

---

## Current Baseline

## [2026-06-26 14:10] Baseline checkpoint created

- Type: chore
- Author: GitHub Copilot
- Branch: pawos
- Files changed:
  - LOCAL_CHANGELOG.md
- Summary:
  - Added a local change log to track future edits.
  - Added per-entry revert instructions.

### Checkpoint
- Before commit: e2c3a47
- After commit: N/A (not committed yet)

### Revert
- Revert this entry (if committed):
  - git revert <commit-hash-containing-LOCAL_CHANGELOG>
- Restore working tree to baseline commit (destructive):
  - git reset --hard e2c3a47

### Notes
- You can ask me "append changelog entry" after each task and I will keep this file updated.
