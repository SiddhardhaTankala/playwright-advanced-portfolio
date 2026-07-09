## Setup new project in VS code

1. Create new folder in VS code and name
2. Make sure this new folder is highlighted, and click Open.
3. VS Code will reload, showing a blank sidebar with GIVEN NAME written in capital letters.
4. Open Terminal > enter command
    npm init playwright@latest
5. When the installer runs, answer the prompts in your terminal like this:
    Do you want to use TypeScript or JavaScript? * Select TypeScript (Press Enter).
    Where do you want to put your end-to-end tests? * Type specs and press Enter.
    Add a GitHub Actions workflow? * Press Y and then Enter.
    Install Playwright browsers (can take a couple of minutes)? * Press Y and then Enter.
6. Create Project folders manually or with the below command
    mkdir -p data lib pages specs/ui specs/api utils
        this instanly creates folders data, lib, pages, specs/ui, specs/api, utils
7. Your sidebar should look neatly organized like below.
    ├── .github/workflows/
    ├── data/
    ├── lib/
    ├── pages/
    ├── specs/
    │   ├── api/
    │   └── ui/
    ├── utils/
    ├── node_modules/
    ├── playwright.config.ts
    ├── package.json
    └── package-lock.json

8. Installation of Cord Project Dependencies (XLSX, CSV, DOTENV):
    npm install xlsx csv-parse dotenv