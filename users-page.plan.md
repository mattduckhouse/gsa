# Users Page Test Plan

## Application Overview

The Users page (`/Users/Index?PartnerId=X`) is the main user-management screen. It has two modes: partner-scoped (when a PartnerId query string is provided) and global/EzAdmin (no PartnerId, showing a partner dropdown). The page contains a search-criteria card with Email, Status, Limit, Name, Level and "Show Login Urls" controls, a DataTable results grid, and (in partner-scoped mode) Add user, Import users, Import Points and Export action buttons. Clicking a user's name or using the per-row Options dropdown navigates to EditUser.

## Test Scenarios

### 1. Page Load

**Seed:** `tests/auth.setup.ts`

#### 1.1. Page loads with correct heading for a partner-scoped URL

**File:** `tests/Users/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: Page title/heading contains 'Users'
    - expect: Search criteria card is visible with heading 'User search criteria'
  2. Check the page heading text
    - expect: Heading reads 'Users : Test Partner' (or similar partner name)

#### 1.2. Partner-scoped page hides partner dropdown and shows action buttons

**File:** `tests/Users/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: The Partner select (`#partnerId`) is NOT visible
    - expect: Add user button is visible
    - expect: Import users button is visible
    - expect: Import Points button is visible
    - expect: Export button is visible

#### 1.3. DataTable is rendered with expected column headers

**File:** `tests/Users/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: Table with aria-label 'User list' is present
  2. Inspect the table header row
    - expect: Column headers include: Partner, Name, External Partner Id, Email, Level, Status, Last Login, Date Created, Options

### 2. Search Criteria Controls

**Seed:** `tests/auth.setup.ts`

#### 2.1. Email address field accepts input and Search button triggers reload

**File:** `tests/Users/search-criteria.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: Page and table are visible
  2. Type a value into the `#emailAddress` input
    - expect: The input reflects the typed value
  3. Click the Search button (`#search-button`)
    - expect: An AJAX request is made to `UsersAjax`
    - expect: The table reloads (spinner appears or rows update)

#### 2.2. Pressing Enter in the email field triggers a search

**File:** `tests/Users/search-criteria.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237` and type a value into `#emailAddress`
    - expect: Input has the typed value
  2. Press the Enter key while the email input is focused
    - expect: The DataTable reloads (same behaviour as clicking Search)

#### 2.3. Status dropdown contains All, Active and Inactive options

**File:** `tests/Users/search-criteria.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: The `#status` select has options: 'All', 'Active', 'Inactive'

#### 2.4. Limit dropdown contains the four expected options

**File:** `tests/Users/search-criteria.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: The `#recordLimit` select has options: 'Only show 1,000 users', 'Only show 5,000 users', 'Only show 10,000 users', 'All'

### 3. Show Login URLs Toggle

**Seed:** `tests/auth.setup.ts`

#### 3.1. Login Url and Iframe Url columns are hidden by default

**File:** `tests/Users/login-urls.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237` and run a search
    - expect: The 'Login Url' column is not visible in the table
    - expect: The 'Iframe Url' column is not visible in the table

#### 3.2. Checking Show Login Urls reveals both URL columns

**File:** `tests/Users/login-urls.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237` and perform a search that returns at least one user
    - expect: Table has rows
  2. Click the `#ShowLogins` checkbox
    - expect: The 'Login Url' column becomes visible in the table
    - expect: The 'Iframe Url' column becomes visible in the table

#### 3.3. Unchecking Show Login Urls hides both URL columns again

**File:** `tests/Users/login-urls.spec.ts`

**Steps:**
  1. Enable Show Login Urls by clicking `#ShowLogins`
    - expect: URL columns are now visible
  2. Click `#ShowLogins` again to uncheck it
    - expect: Both URL columns are hidden again

### 4. Action Buttons Navigation

**Seed:** `tests/auth.setup.ts`

#### 4.1. Add user button navigates to EditUser with Id=-1

**File:** `tests/Users/action-buttons.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: Add user button is visible
  2. Click the Add user button
    - expect: Browser navigates to a URL containing `EditUser` and `Id=-1` and `PartnerId=1294237`

#### 4.2. Import users button navigates to ImportUsers page

**File:** `tests/Users/action-buttons.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237` and click the Import users button
    - expect: Browser navigates to a URL containing `ImportUsers` and `PartnerId=1294237`

#### 4.3. Export button triggers Excel download

**File:** `tests/Users/action-buttons.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237` and perform a search that returns results
    - expect: Table has data rows
  2. Click the Export button (`#exportButton`)
    - expect: A file download is triggered (download event fires or a `.xlsx` file is saved)

### 5. User Results Table

**Seed:** `tests/auth.setup.ts`

#### 5.1. Searching by email filters results to matching users

**File:** `tests/Users/results-table.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`
    - expect: Page loads
  2. Enter a known partial email into `#emailAddress` and click Search
    - expect: Table shows only rows where the Email column contains the entered string (or no rows if no match)

#### 5.2. Empty search returns rows in the table

**File:** `tests/Users/results-table.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237` and click Search without entering any criteria
    - expect: Table body has at least one data row

#### 5.3. User name in results is a link to EditUser

**File:** `tests/Users/results-table.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`, run a search and wait for rows to appear
    - expect: At least one row is visible
  2. Click the Name link in the first result row
    - expect: Browser navigates to a URL containing `EditUser` and a user `id` query parameter

#### 5.4. Per-row Options dropdown contains 'Edit user'

**File:** `tests/Users/results-table.spec.ts`

**Steps:**
  1. Navigate to `/Users/Index?PartnerId=1294237`, run a search, and click the '...' Options button on the first row
    - expect: A dropdown menu appears containing the item 'Edit user'

#### 5.5. Clicking Edit user in the Options dropdown navigates to EditUser

**File:** `tests/Users/results-table.spec.ts`

**Steps:**
  1. Open the Options dropdown on a result row and click 'Edit user'
    - expect: Browser navigates to a URL containing `EditUser` and the correct `id` and `PartnerId` query parameters
