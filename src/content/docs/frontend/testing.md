---
title: Playwright Test System Setup Guide
description: How to set up the same Playwright-based end-to-end testing system used in this project for any other project
---

# Playwright Test System Setup Guide

This guide explains how to set up the same Playwright-based end-to-end testing system used in this project for any other project.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)

## Overview

This test system provides:

- **End-to-end testing** with Playwright across multiple browsers (Chromium, Firefox, WebKit)
- **Database integration** for test data management and cleanup
- **Environment-based configuration** (local, production, test)
- **Automatic server management** (starts/stops dev server or production build)
- **Test helpers** for common operations (authentication, form submission, validation)
- **Global setup/teardown** for database connections and cleanup
- **HTML reports** with video recordings and traces on failures

## Prerequisites

- Node.js >= 20.3.0
- npm or yarn package manager
- PostgreSQL database (or adapt for your database)
- A web application to test (Astro, Next.js, React, Vue, etc.)

## Installation

### 1. Install Dependencies

```bash
npm install -D @playwright/test pg dotenv
npm install -D @types/node  # If using TypeScript
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

This downloads browser binaries for Chromium, Firefox, and WebKit.

## Project Structure

Create the following directory structure in your project:

```
your-project/
├── playwright.config.ts
├── tests/
│   ├── global-setup.ts
│   ├── global-teardown.ts
│   ├── helpers/
│   │   ├── auth-helpers.ts      # Authentication helpers
│   │   └── db-helpers.ts        # Database helpers
│   ├── utils/
│   │   └── db.ts                # Database connection utilities
│   ├── fixtures/
│   │   └── test-image.jpg       # Test fixtures (images, files, etc.)
│   ├── auth/
│   │   ├── login.spec.ts
│   │   ├── sign-up.spec.ts
│   │   └── ...
│   └── dashboard/
│       └── ...
├── .env.local                  # Local environment variables
├── .env.production             # Production environment variables
└── .env.test                   # Test-specific environment variables
```

## Configuration

### 1. Playwright Configuration (`playwright.config.ts`)

Create `playwright.config.ts` in your project root:

```typescript
import fs from 'fs';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

// Load .env first (base configuration)
dotenv.config();

// Get mode from NODE_ENV or command line arguments
const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'local';
console.log('Mode:', mode);

// Load the appropriate env file based on mode
const envFile = mode === 'production' ? '.env.production' : '.env.local';
console.log('Loading environment file:', envFile);

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log('Environment file loaded successfully');
} else {
  console.warn(`Environment file ${envFile} not found, using base .env`);
}

// Load test environment variables if available
if (fs.existsSync('.env.test')) {
  dotenv.config({ path: '.env.test' });
  console.log('Test environment file loaded');
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',              // folder for tests
  timeout: 2 * 60 * 1000,         // 2 minutes per test
  /* Global setup and teardown for database connection management */
  globalSetup: './tests/global-setup.ts',
  globalTeardown: './tests/global-teardown.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Run your local dev server before starting the tests */
  webServer: {
    command: isProd ? 'npm run build && npm run preview' : 'npm run dev',
    port: 4321,  // Adjust to your app's port
    reuseExistingServer: !process.env.CI,
    timeout: 5 * 60 * 1000, // 5 minutes for build + preview
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'http://localhost:4321',  // Adjust to your app's URL
    headless: true,                    // run without UI
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',        // record video if test fails
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

**Key Configuration Points:**

- **`testDir`**: Directory where your test files are located
- **`webServer.command`**: Command to start your development server (adjust `npm run dev` to your project's command)
- **`webServer.port`**: Port your app runs on (adjust `4321` to your app's port)
- **`use.baseURL`**: Base URL for your application
- **`timeout`**: Maximum time for each test (adjust as needed)

### 2. Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "NODE_ENV=local playwright test --config=playwright.config.ts",
    "test:ui": "NODE_ENV=local playwright test --ui --config=playwright.config.ts",
    "test:prod": "NODE_ENV=production playwright test --config=playwright.config.ts",
    "test:prod:ui": "NODE_ENV=production playwright test --ui --config=playwright.config.ts"
  }
}
```

## Environment Variables

Create environment files for different modes:

### `.env.local` (for local development testing)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=postgres
DB_PASSWORD=your_password

TEST_LOGIN_USERNAME=test@example.com
TEST_LOGIN_PASSWORD=testpassword123
TEST_LOGIN_USERNAME_INACTIVE=inactive@example.com
```

### `.env.production` (for production testing)

```env
DB_HOST=production-db-host
DB_PORT=5432
DB_NAME=your_production_db
DB_USER=your_user
DB_PASSWORD=your_production_password

TEST_LOGIN_USERNAME=prod-test@example.com
TEST_LOGIN_PASSWORD=prod-test-password
```

### `.env.test` (optional, test-specific overrides)

```env
# Test-specific environment variables
# These will override values from .env.local or .env.production
```

## Database Setup

### 1. Database Utilities (`tests/utils/db.ts`)

Create database connection utilities:

```typescript
import { Pool } from 'pg';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'your_database',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 5, // Connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create connection pool
export const db = new Pool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const client = await db.connect();
    console.log('✅ Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Simple query helper
export async function query(text: string, params?: any[]) {
  const client = await db.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Clean up function
export async function closeConnection() {
  await db.end();
}
```

**Note:** If you're using a different database (MySQL, MongoDB, etc.), adapt this file accordingly.

### 2. Global Setup (`tests/global-setup.ts`)

```typescript
/**
 * Global Setup for Playwright Tests
 * 
 * This file runs once before all tests to set up the database connection
 * and perform any global initialization needed for the test suite.
 */

import { testConnection } from './utils/db';

/**
 * Global setup function that runs before all tests
 * Establishes database connection and performs global initialization
 */
async function globalSetup() {
  console.log('🚀 Starting global test setup...');
  
  try {
    // Test database connection
    const connected = await testConnection();
  
    if (!connected) {
      throw new Error('Failed to connect to database during global setup');
    }
  
    console.log('✅ Global setup completed successfully');
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  }
}

export default globalSetup;
```

### 3. Global Teardown (`tests/global-teardown.ts`)

```typescript
/**
 * Global Teardown for Playwright Tests
 * 
 * This file runs once after all tests complete to clean up resources
 * and close database connections properly.
 */

import { closeConnection } from './utils/db';
import { cleanupTestData } from './helpers/db-helpers';

/**
 * Global teardown function that runs after all tests
 * Closes database connections and performs global cleanup
 */
async function globalTeardown() {
  console.log('🧹 Starting global test teardown...');

  // Delete test data
  await cleanupTestData();
  
  try {
    // Close database connection
    await closeConnection();
    console.log('✅ Global teardown completed successfully');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw error in teardown to avoid masking test failures
  }
}

export default globalTeardown;
```

### 4. Database Helpers (`tests/helpers/db-helpers.ts`)

Create helpers for database operations:

```typescript
import { query } from '../utils/db';

// Clean up test data
export async function cleanupTestData() {
  try {
    // Delete test data based on your schema
    // Example: Delete users with email pattern 'test-%'
    const deleteUsersResult = await query(
      'DELETE FROM users WHERE email LIKE $1',
      ['test-%']
    );
    console.log('🗑️ Deleted users:', deleteUsersResult.rowCount);
  
    console.log('🧹 Test data cleaned up');
  } catch (error) {
    console.error('Error cleaning up test data:', error);
  }
}

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

// Create test user
export async function createTestUser(email: string, password: string, name: string) {
  try {
    const result = await query(
      'INSERT INTO users (email, password, name, is_active) VALUES ($1, $2, $3, $4) RETURNING id',
      [email, password, name, false]
    );
    return result.rows[0].id;
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}

// Add more helper functions as needed for your application
```

## Writing Tests

### 1. Test Helpers (`tests/helpers/auth-helpers.ts`)

Create reusable test helpers:

```typescript
import { expect, type Page } from "@playwright/test";

const BASE_URL = 'http://localhost:4321';  // Adjust to your app's URL

/**
 * Get random data for testing
 */
export async function getRandomData() {
  const randomString = Math.random().toString(36).substring(2, 10);
  const name = `test-${randomString}`;
  const email = `test-${randomString}@gmail.com`;
  const password = `test-password-${randomString}`;
  return { name, email, password };
}

/**
 * Validate toast message
 */
export async function validateMessage(page: Page, message: string) {
  await page.waitForTimeout(2000);
  await expect(page.locator('.Toastify')).toHaveText(message);
}

/**
 * Login with user credentials
 */
export async function login(page: Page, email: string, password: string) {
  await page.goto(`${BASE_URL}/login`);
  await page.waitForTimeout(2000);
  
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
}
```

### 2. Example Test File (`tests/auth/login.spec.ts`)

```typescript
import { test, expect, type Page } from '@playwright/test';
import { validateMessage } from '../helpers/auth-helpers';

const BASE_URL = 'http://localhost:4321';

test.describe('Login Authentication Flow', { tag: ['@auth'] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.waitForTimeout(2000);
  });

  test('successfully authenticate valid users', { tag: ['@positive'] }, async ({ page }) => {
    const validUserEmail = process.env.TEST_LOGIN_USERNAME!;
    const password = process.env.TEST_LOGIN_PASSWORD!;

    await page.fill('input[type="email"]', validUserEmail);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
  });

  test('reject invalid credentials', { tag: ['@negative'] }, async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(`${BASE_URL}/login`);
    await validateMessage(page, 'Invalid credentials');
  });
});
```

### 3. Test Organization

- **Group related tests** using `test.describe()`
- **Use tags** for filtering: `@auth`, `@positive`, `@negative`, `@long-running`
- **Use `beforeEach`** for common setup (navigating to pages, etc.)
- **Extract reusable functions** to helpers
- **Use environment variables** for test credentials

## Running Tests

### Basic Commands

```bash
# Run all tests in headless mode (local environment)
npm run test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests against production build
npm run test:prod

# Run tests against production with UI
npm run test:prod:ui
```

### Filtering Tests

```bash
# Run only tests with specific tag
npx playwright test --grep "@auth"

# Run only positive tests
npx playwright test --grep "@positive"

# Run specific test file
npx playwright test tests/auth/login.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

### Debugging

```bash
# Run with UI mode for debugging
npm run test:ui

# Run in headed mode (see browser)
npx playwright test --headed

# Run with debug mode
npx playwright test --debug
```

### Viewing Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports are saved in `playwright-report/` directory.

## Best Practices

### 1. Test Data Management

- **Use test prefixes** for test data (e.g., `test-*` emails) to easily identify and clean up
- **Clean up after tests** in global teardown
- **Use random data** to avoid conflicts between parallel tests

### 2. Test Organization

- **Group by feature** (auth, dashboard, etc.)
- **Use descriptive test names** that explain what is being tested
- **Tag tests** for easy filtering (`@positive`, `@negative`, `@edge-case`, `@long-running`)

### 3. Wait Strategies

- **Avoid hard-coded waits** when possible
- **Use Playwright's auto-waiting** features (`waitForSelector`, `waitForURL`, etc.)
- **Use `waitForTimeout` sparingly** and only when necessary

### 4. Selectors

- **Prefer stable selectors** (data-testid, role, label)
- **Avoid CSS selectors** that are likely to change
- **Use semantic selectors** when possible

### 5. Environment Management

- **Never commit sensitive data** to version control
- **Use `.env.test`** for test-specific overrides
- **Document required environment variables** in README

### 6. CI/CD Integration

- **Set `CI=true`** in CI environments to enable retries and single worker
- **Use environment-specific configs** for different stages
- **Store secrets** in CI/CD secrets management

## Troubleshooting

### Common Issues

1. **Database connection fails**

   - Check database credentials in environment files
   - Ensure database is running
   - Verify network connectivity
2. **Tests timeout**

   - Increase timeout in `playwright.config.ts`
   - Check if dev server is starting correctly
   - Verify port is not in use
3. **Tests fail inconsistently**

   - Add proper waits instead of fixed timeouts
   - Check for race conditions
   - Ensure test data cleanup is working
4. **Browser not found**

   - Run `npx playwright install` again
   - Check Playwright version compatibility

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-test)

## Summary

This test system provides a robust foundation for end-to-end testing with:

✅ Multi-browser testing (Chromium, Firefox, WebKit)
✅ Database integration for test data management
✅ Environment-based configuration
✅ Automatic server management
✅ Reusable test helpers
✅ Global setup/teardown for cleanup
✅ HTML reports with video/trace on failures

Follow this guide step-by-step to set up the same system in your project, adapting the database schema, selectors, and test flows to match your application.
