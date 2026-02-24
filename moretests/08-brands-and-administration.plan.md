# Brands & Administration Test Plan

## Application Overview

This plan covers the Administration-level management pages for Brands (`/Brands/`) and the Partners list (`/Partners/`). The Brands page has a DataTable with Add, Show inactive, Show Brands Without Tags, Generate Missing Meta, and Export buttons. The EditBrand page is a form with brand details. The Partners list has Add partner, Show non-active, and Export buttons with a DataTable. Both pages are accessed via the Administration sidebar section without a partner context. This plan also covers the Change Partner selector page which allows switching the current partner context.

## Test Scenarios

### 1. Partners List – Administration

**Seed:** `tests/auth.setup.ts`

#### 1.1. Partners list page loads after clicking Partners in the sidebar

**File:** `tests/AdminPartners/index.spec.ts`

**Steps:**
  1. From the Dashboard, click 'Partners' in the Administration sidebar section
    - expect: Browser navigates to `/Partners/`
    - expect: Page heading reads 'Partners'
    - expect: A DataTable with partner rows is visible

#### 1.2. Partners DataTable has Name and Status columns

**File:** `tests/AdminPartners/index.spec.ts`

**Steps:**
  1. Navigate to `/Partners/` and inspect the table headers
    - expect: Column headers 'Name' and 'Status' are visible

#### 1.3. Partners table loads at least one row

**File:** `tests/AdminPartners/index.spec.ts`

**Steps:**
  1. Navigate to `/Partners/` and wait for the DataTable AJAX to complete
    - expect: At least one partner row is visible after the DataTable loads

#### 1.4. Add partner button is visible

**File:** `tests/AdminPartners/index.spec.ts`

**Steps:**
  1. Navigate to `/Partners/`
    - expect: A button labelled 'Add partner' is present

#### 1.5. Show non-active button toggles to Show active and updates URL

**File:** `tests/AdminPartners/index.spec.ts`

**Steps:**
  1. Navigate to `/Partners/` and click 'Show non-active'
    - expect: After clicking 'Show non-active', the button text changes to 'Show active'
    - expect: URL contains `IncludeInactive=true`

#### 1.6. Clicking a partner row opens the partner Dashboard

**File:** `tests/AdminPartners/index.spec.ts`

**Steps:**
  1. Navigate to `/Partners/`, wait for rows, click a partner name link
    - expect: Browser navigates to `/Partners/Dashboard?PartnerId=...`

### 2. Brands – Index

**Seed:** `tests/auth.setup.ts`

#### 2.1. Brands page loads after clicking Brands in the sidebar

**File:** `tests/Brands/index.spec.ts`

**Steps:**
  1. From the Dashboard, click 'Brands' in the Administration sidebar section
    - expect: Browser navigates to `/Brands/`
    - expect: Page heading reads 'Brands'

#### 2.2. Brands DataTable has Brand name, Status, Contact and Options columns

**File:** `tests/Brands/index.spec.ts`

**Steps:**
  1. Navigate to `/Brands/` and inspect the table headers
    - expect: Column headers 'Brand name', 'Status', 'Contact', 'Options' are visible

#### 2.3. Add brand button is visible

**File:** `tests/Brands/index.spec.ts`

**Steps:**
  1. Navigate to `/Brands/`
    - expect: A button labelled 'Add brand' is present

#### 2.4. Show inactive button toggles to Show active

**File:** `tests/Brands/index.spec.ts`

**Steps:**
  1. Navigate to `/Brands/` and click 'Show inactive'
    - expect: Button label changes to 'Show active' after clicking 'Show inactive'
    - expect: URL contains `ShowInactive=true`

#### 2.5. Show Brands Without Tags filter button is visible

**File:** `tests/Brands/index.spec.ts`

**Steps:**
  1. Navigate to `/Brands/`
    - expect: A button labelled 'Show Brands Without Tags' is present

#### 2.6. Export button is visible

**File:** `tests/Brands/index.spec.ts`

**Steps:**
  1. Navigate to `/Brands/`
    - expect: An 'Export' button is present

#### 2.7. Options dropdown on a brand row contains expected actions

**File:** `tests/Brands/index.spec.ts`

**Steps:**
  1. Navigate to `/Brands/`, wait for rows, click the '...' dropdown on the first row
    - expect: A '...' dropdown button reveals options such as 'Edit brand'

### 3. Brands – Edit Brand

**Seed:** `tests/auth.setup.ts`

#### 3.1. Clicking edit on a brand row navigates to EditBrand

**File:** `tests/Brands/edit-brand.spec.ts`

**Steps:**
  1. Open the Options dropdown on the first brand row and click 'Edit brand'
    - expect: Browser navigates to `/Brands/EditBrand?id=...`

#### 3.2. EditBrand page contains brand name and status fields

**File:** `tests/Brands/edit-brand.spec.ts`

**Steps:**
  1. Navigate to an EditBrand page
    - expect: A brand name input and a status dropdown or checkbox are visible

#### 3.3. Save brand with unchanged values does not produce an error

**File:** `tests/Brands/edit-brand.spec.ts`

**Steps:**
  1. Navigate to EditBrand, leave all fields unchanged, and submit the form
    - expect: No error message shown; page reloads or shows a success indicator

### 4. Partner Selection (Change Partner)

**Seed:** `tests/auth.setup.ts`

#### 4.1. ChangePartnerList page loads and shows a list of partners

**File:** `tests/AdminPartners/change-partner.spec.ts`

**Steps:**
  1. Navigate to `/ChangePartnerList`
    - expect: Browser navigates to `/ChangePartnerList`
    - expect: A list or table of partners is visible

#### 4.2. Clicking a partner from the list switches the current partner context

**File:** `tests/AdminPartners/change-partner.spec.ts`

**Steps:**
  1. Navigate to `/ChangePartnerList` and click on a partner name in the list
    - expect: Browser navigates to the Dashboard for the selected partner
    - expect: The sidebar 'Current partner' links update to the selected partner's PartnerId
