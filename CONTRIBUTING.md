# Contributing to the Project

Welcome! This document explains how to contribute to the project in an organized and consistent way.

## 1. Branch Strategy

- **main**: protected, only stable versions, no direct pushes, merge only when project or release is ready.  
- **develop**: main development branch, merge all features here, direct pushes are not allowed, PR only.  
- **feature/<task-name>**: create for each task. Example: `feature/login-page`, `feature/meme-upload`.  
- **fix/<bug-name>**: for hotfixes. Example: `fix/like-button`.

## 2. Working on Tasks

1. Pull latest develop: `git checkout develop && git pull origin develop`  
2. Create feature branch: `git checkout -b feature/task-name`  
3. Work and commit changes  
4. Push branch: `git push -u origin feature/task-name`  
5. Create Pull Request → target: `develop`

## 3. Pull Request Guidelines

- PRs must target **develop**, not main  
- Use clear commit messages:
```bash
    feat: add login page
    fix: button styles
    refactor: code improvement
```
- Minimum **1 approval** required  
- All comments must be resolved  
- You cannot approve your own PR

## 4. Commit Guidelines

Use Conventional Commits:
```bash
feat: new feature
fix: bug fix
refactor: code improvement
style: formatting changes
docs: documentation
chore: routine tasks
```

## 5. Code Review

- Check for errors  
- Readability  
- Variable naming  
- Code cleanliness  
- Avoid hardcoding

Comments should be friendly and actionable.

## 6. Main Branch Rules

- No direct pushes to main  
- PR only after project is stable  
- Requires 1–2 approvals  
- Main must remain stable

## 7. Dependency Management
 
- Mention added packages in PR  
- Avoid heavy or unsafe packages

## 8. Bug Fixes

- Create `fix/<bug>` branch  
- Describe bug in PR  
- Merge into develop after approval

## 12. Repo Cleanliness

- Do not push local files (.DS_Store, node_modules)  
- Check .gitignore  
- No credentials in repo

# Branch Strategy

Our branches are organized as follows:

## main

- Protected branch  
- Only stable/release code  
- No direct pushes  
- Merge only when the project is ready

## develop

- Main development branch  
- Merge all feature branches here  
- Direct pushes forbidden  
- Team members collaborate via PRs

## feature/<task-name>

- For new features  
- Branch off develop  
- Merge back to develop via PR

## fix/<bug-name>

- For hotfixes  
- Branch off develop or main (if urgent)  
- Merge back to develop (and main if release ready)

## Workflow Diagram
```bash
feature/* → develop → main
```

- Developers create `feature/*` branches  
- Merge into `develop` after PR approval  
- Merge `develop` → `main` for release
