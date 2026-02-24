# Logs Explorer Test Plan

## Application Overview

The Logs Explorer (`/Logs/LogsExplorer/`) is an EzAdmin-only page that browses a hierarchical log file store (blob storage). It renders a table of folder/file entries; clicking a folder navigates deeper by appending a `?Path=` query string; clicking a log file navigates to `/Logs/ViewLogFile?Blob=...` which shows the raw log content in a text view. Tests navigate via the 'Logs' sidebar link in the Administration section.

## Test Scenarios

### 1. Logs Explorer – Page Load

**Seed:** `tests/auth.setup.ts`

#### 1.1. Logs Explorer page loads after clicking Logs in the sidebar

**File:** `tests/Logs/page-load.spec.ts`

**Steps:**
  1. From the Dashboard, click 'Logs' in the Administration sidebar section
    - expect: Browser navigates to `/Logs/LogsExplorer/`
    - expect: Page heading reads 'Logs'

#### 1.2. Log entries table is rendered

**File:** `tests/Logs/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Logs/LogsExplorer/` and wait for the page to load
    - expect: A table is visible
    - expect: The table has at least one row

#### 1.3. Table contains Name column

**File:** `tests/Logs/page-load.spec.ts`

**Steps:**
  1. Navigate to the Logs Explorer and inspect the table header
    - expect: The table header contains a 'Name' column

### 2. Logs Explorer – Folder Navigation

**Seed:** `tests/auth.setup.ts`

#### 2.1. Clicking a folder link appends the folder path to the URL

**File:** `tests/Logs/folder-navigation.spec.ts`

**Steps:**
  1. Navigate to the Logs Explorer, identify a folder-type link and click it
    - expect: Browser URL contains a `?Path=<folderName>` query string
    - expect: A new list of entries for the sub-folder is rendered

#### 2.2. Navigating into a sub-folder shows its contents

**File:** `tests/Logs/folder-navigation.spec.ts`

**Steps:**
  1. Navigate to a sub-folder by clicking a folder link in the Logs Explorer
    - expect: Table is populated with entries scoped to the selected sub-folder path

### 3. Logs Explorer – Log File Viewing

**Seed:** `tests/auth.setup.ts`

#### 3.1. Clicking a log file link navigates to ViewLogFile

**File:** `tests/Logs/view-log-file.spec.ts`

**Steps:**
  1. Navigate into a folder that contains log files, then click a file-type link
    - expect: Browser navigates to `/Logs/ViewLogFile?Blob=...`
    - expect: Page contains the raw log content or a text display area

#### 3.2. ViewLogFile page heading reads 'Logs' or the file name

**File:** `tests/Logs/view-log-file.spec.ts`

**Steps:**
  1. Navigate to a ViewLogFile URL and inspect the page heading
    - expect: A page heading or title indicates the log file being viewed
