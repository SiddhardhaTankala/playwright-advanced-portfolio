## Terminal commands
npm init playwright@latest	- Launches the interactive wizard to install Playwright and TS.
npm install xlsx csv-parse dotenv	- Installs external engines for data-driven testing and configs.
npx playwright test	 - Executes the test runner across your specs layout.







## Git and GitHub workflow commands
Run these commands in exact order when managing your repository:
# Check what files Git sees as changed or untracked
git status

# Stage all newly created files and modifications for saving
git add .

# Save the staged snapshot locally with an explicit engineering note
git commit -m "chore: initial project setup, dependencies, and folder structure"

# Connect your local Mac project folder to your online GitHub cloud repository
git remote add origin https://github.com/YOUR_USERNAME/playwright-advanced-portfolio.git

# Set your primary local branch designation to industry-standard 'main'
git branch -M main

# Push code to your online repository and map your local branch to the remote destination
git push -u origin main

# Subsequent standard pushes (after the remote destination is established)
git push

# Critical Fix: How to untrack a file committed by mistake
If you accidentally push a configuration file (like .env) to GitHub before adding it to your .gitignore, run these commands to remove it from the cloud without deleting it from your MacBook:

git rm --cached .env
git commit -m "chore: remove .env from tracking and add to gitignore"
git push