import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';

//Load environment variables from .env file
dotenv.config();

export default defineConfig({

  //Point to our customized folder layout
  testDir: './specs',

  //Max time one single test can run for (30 seconds)
  timeout: 30000,     // 30 seconds
  expect: {           //Max time expect() should wait for the condition to be met (5 seconds)
    timeout: 5000,    // 5 seconds
  },
  
  //Run tests within files in parallel to speed up the test execution time. This is the default behavior, but we are explicitly setting it here for clarity.
  fullyParallel: true,

  //Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,     //CI is a boolean environment variable that is set to true when running in a CI environment

  //Retry a failing test on CI to handle environmental flakiness smoothly. Retry 2 times on CI, but no retries locally.
  retries: process.env.CI ? 2 : 0,

  //Limit workers on CI to prevent resource clogging. Use the default number of workers locally.
  workers: process.env.CI ? 1 : undefined,

  //Generate a clean HTML report and a clean console list output of the test results after every test run.
  reporter: [['html', { open: 'never'}], ['list']],

  use: {
    //Read the base URL from the environment variable BASE_URL, or default to 'http://localhost:3000' if not set.
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    //save crucial debugging information only when test fails, to avoid cluttering the test results with unnecessary data.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

  },

  /* configure execution engines */
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},

    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},

    },

    
  ]


});