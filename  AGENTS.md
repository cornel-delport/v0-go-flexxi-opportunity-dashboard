# AI Coding Rules
- Before making any change, identify all files that import or depend on the file being changed
- After every change, run `npm run build` and fix ALL errors before considering the task done
- Never leave TypeScript errors unresolved
- Always check that existing tests still pass after changes
- If you add a new dependency, update both package.json AND dev.nix
```
BEFORE every change:
- List all files you will modify
- For each file, confirm it currently has no errors
- Do NOT modify files unrelated to the requested feature

AFTER every change:
- Run npm run check
- If any new errors appeared that didn't exist before, fix them immediately
- Do not consider the task done until npm run check passes cleanly
---

### 2. 🔁 Give Gemini a "Fix Loop" Prompt Template
Instead of just saying "add feature X", use this prompt pattern every time:
```
Add [feature X]. 
Then:
1. Run the build and show me any errors
2. Fix all errors
3. Run the build again to confirm it's clean
4. List every file you changed
```

---

### 3. 🧪 Set Up a Pre-Task Checklist in Your Prompt
Before asking Gemini to build something, paste this:
```
Before starting:
- What files will this change affect?
- Are there any existing imports or dependencies that could break?

After finishing:
- Run `npm run build` — fix any errors
- Run `npm test` — fix any failures
- Confirm the preview starts successfully