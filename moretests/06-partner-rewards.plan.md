# Partner Rewards Test Plan

## Application Overview

The Partner Rewards section (`/Partners/PartnerRewards/?PartnerId=X`) lets administrators assign master rewards to a specific partner, reorder them, and manage their state. Key pages are: the Partner Rewards index (active rewards DataTable with Add/Sort/Export actions), the Add Partner Rewards page (reward picker with available master rewards), and the Sort Partner Rewards drag-and-drop page. Tests navigate via the 'Partner rewards' sidebar link from the Dashboard.

## Test Scenarios

### 1. Partner Rewards – Index Page

**Seed:** `tests/auth.setup.ts`

#### 1.1. Partner Rewards page loads after clicking sidebar link

**File:** `tests/PartnerRewards/index.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237`, then click 'Partner rewards' in the sidebar
    - expect: Browser navigates to `/Partners/PartnerRewards/?PartnerId=1294237`
    - expect: Page heading contains 'Partner rewards' or the partner name

#### 1.2. Rewards DataTable is rendered with expected columns

**File:** `tests/PartnerRewards/index.spec.ts`

**Steps:**
  1. Navigate to the Partner Rewards index page and inspect the table headers
    - expect: A table with columns such as 'Reward', 'Status', 'Options' is visible

#### 1.3. Add reward button is visible

**File:** `tests/PartnerRewards/index.spec.ts`

**Steps:**
  1. Navigate to the Partner Rewards index page
    - expect: A button labelled 'Add reward' or similar is visible

#### 1.4. Sort rewards button is visible

**File:** `tests/PartnerRewards/index.spec.ts`

**Steps:**
  1. Navigate to the Partner Rewards index page
    - expect: A button labelled 'Sort' or 'Sort rewards' is visible

#### 1.5. Export button is visible

**File:** `tests/PartnerRewards/index.spec.ts`

**Steps:**
  1. Navigate to the Partner Rewards index page
    - expect: An Export button is visible

### 2. Partner Rewards – Add Rewards

**Seed:** `tests/auth.setup.ts`

#### 2.1. Clicking Add reward navigates to the Add Partner Rewards page

**File:** `tests/PartnerRewards/add-rewards.spec.ts`

**Steps:**
  1. Navigate to Partner Rewards index and click the 'Add reward' button
    - expect: Browser navigates to `/Partners/PartnerRewards/AddPartnerRewards?PartnerId=1294237`
    - expect: A list or table of available master rewards is shown

#### 2.2. Available rewards table is populated with master rewards

**File:** `tests/PartnerRewards/add-rewards.spec.ts`

**Steps:**
  1. Navigate to the Add Partner Rewards page and wait for the table to load
    - expect: The available rewards table has at least one row
    - expect: Each row has a reward name and an add/select action

#### 2.3. Cancel from Add Partner Rewards returns to the index

**File:** `tests/PartnerRewards/add-rewards.spec.ts`

**Steps:**
  1. Navigate to Add Partner Rewards page and click Cancel or the back button
    - expect: Browser navigates back to the Partner Rewards index page

### 3. Partner Rewards – Sort Rewards

**Seed:** `tests/auth.setup.ts`

#### 3.1. Clicking Sort navigates to the Sort Partner Rewards page

**File:** `tests/PartnerRewards/sort-rewards.spec.ts`

**Steps:**
  1. Navigate to Partner Rewards index and click the 'Sort' button
    - expect: Browser navigates to `/Partners/PartnerRewards/SortPartnerRewards?PartnerId=1294237`
    - expect: A sortable list of rewards is shown

#### 3.2. Sort page renders a draggable list of the partner's rewards

**File:** `tests/PartnerRewards/sort-rewards.spec.ts`

**Steps:**
  1. Navigate to the Sort Partner Rewards page and inspect the list
    - expect: Each reward item has a drag handle or is identified as draggable
    - expect: The list contains at least one reward item

#### 3.3. Save order button is present on the Sort page

**File:** `tests/PartnerRewards/sort-rewards.spec.ts`

**Steps:**
  1. Navigate to the Sort Partner Rewards page
    - expect: A 'Save' or 'Save order' button is visible
