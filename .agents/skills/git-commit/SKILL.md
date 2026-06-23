---
name: git-commit
description: Automatically stage all changes, generate a professional Conventional Commit message based on the diff, and commit the changes. Use this skill when asked to "commit changes", "save progress", "run git-commit", "commit all", or "generate a commit message".
license: MIT
metadata:
  author: project-agent
  version: "1.0"
---

# Git Commit Message Generator & Auto-Commit

This skill allows agents to automatically stage all pending changes in the workspace, analyze the diff of the changes, generate a clear and professional commit message following the Conventional Commits specification, and execute the commit.

---

## Workflow Steps

Agents should follow this sequence of steps to stage, generate, and commit changes:

### 1. Stage All Changes

Automatically stage all modified, new, and deleted files in the repository:

```bash
git add .
```

### 2. Analyze Changes

Retrieve the diff of all staged changes to understand the context of what was modified, added, or removed:

```bash
git diff --cached
```

### 3. Generate the Commit Message

Analyze the diff output from the previous step and compose a professional commit message. The message must strictly follow the [Conventional Commits](https://www.conventionalcommits.org/) format.

#### Conventional Commits Guidelines:

- **Format**: `<type>: <description>`
  - Example: `feat: add new commit message generator skill`
- **Commit Types**:
  - `feat`: A new feature or component.
  - `fix`: A bug fix.
  - `refactor`: Code changes that neither fix a bug nor add a feature (e.g., renaming variables/packages, restructuring folders).
  - `docs`: Documentation-only changes (e.g., updates to README, skills, or inline comments).
  - `style`: Formatting, white-space, missing semi-colons, etc. (no production code changes).
  - `test`: Adding or updating tests.
  - `chore`: Updating build tasks, package managers, dependencies, or configuration files (no production code changes).
- **Rules**:
  - Keep the subject line **under 72 characters**.
  - Write the description in the **imperative mood** (e.g., "add button" instead of "added button" or "adds button").
  - Be specific and descriptive about _what_ changed and _why_.
  - Use lowercase for the type and the start of the description. Do not end the subject line with a period.

### 4. Execute Commit

Run the commit command with the generated message:

```bash
git commit -m "<type>: <description>"
```

### 5. Verify and Confirm

Confirm the commit was successful by running the following command to display the last commit:

```bash
git log -n 1 --oneline
```

Report the final commit message and status back to the user.

---

## Edge Case Handling

- **No Staged Changes**: If `git diff --cached` returns empty, check if there are unstaged changes by running `git status`. If there are no changes to commit, report this to the user and stop.
- **Not a Git Repository**: If git commands fail with `fatal: not a git repository`, check if git needs to be initialized. Prompt the user to initialize a repository or run `git init` if appropriate.
