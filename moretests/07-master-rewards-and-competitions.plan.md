# Master Rewards & Competitions Test Plan

## Application Overview

This plan covers two Administration-level areas: Master Rewards (`/Rewards/`) and Competitions (`/Competitions/`). Master Rewards is a DataTable list of all rewards available across partners, with Add, Sort, Apply to Partners, Export and Reward History (modal) features. The EditReward page has a multi-section form. Competitions is a similar DataTable list of master competitions with Add, Show inactive/active toggle, and Export. Both are accessed via the Administration sidebar section and do not require a partner context. Tests navigate via sidebar links.

## Test Scenarios

### 1. Master Rewards – Index

**Seed:** `tests/auth.setup.ts`

#### 1.1. Master Rewards page loads after clicking sidebar link

**File:** `tests/MasterRewards/index.spec.ts`

**Steps:**
  1. From the Dashboard, click 'Master rewards' in the Administration sidebar section
    - expect: Browser navigates to `/Rewards/`
    - expect: Page heading reads 'Master rewards'

#### 1.2. Rewards DataTable is rendered with at least one row

**File:** `tests/MasterRewards/index.spec.ts`

**Steps:**
  1. Navigate to `/Rewards/` and wait for the DataTable AJAX to complete
    - expect: A table contains at least one reward row after loading

#### 1.3. Add reward button is visible

**File:** `tests/MasterRewards/index.spec.ts`

**Steps:**
  1. Navigate to `/Rewards/`
    - expect: A button labelled 'Add reward' is present

#### 1.4. Sort button navigates to Sort Rewards page

**File:** `tests/MasterRewards/index.spec.ts`

**Steps:**
  1. Navigate to Master Rewards index and click the 'Sort' button
    - expect: Browser navigates to `/Rewards/SortRewards`
    - expect: A sortable list of rewards is shown

#### 1.5. Export button triggers an Excel file download

**File:** `tests/MasterRewards/index.spec.ts`

**Steps:**
  1. Navigate to Master Rewards, wait for data to load, then click the Export button
    - expect: A file download is triggered

#### 1.6. Reward History modal opens when history button is clicked

**File:** `tests/MasterRewards/index.spec.ts`

**Steps:**
  1. Navigate to Master Rewards and click a history / clock icon or history button on a reward row
    - expect: The 'Reward History' modal becomes visible

### 2. Master Rewards – Edit Reward

**Seed:** `tests/auth.setup.ts`

#### 2.1. Clicking a reward name navigates to EditReward

**File:** `tests/MasterRewards/edit-reward.spec.ts`

**Steps:**
  1. Navigate to Master Rewards, wait for table to load, then click the first reward name or edit action
    - expect: Browser navigates to `/Rewards/EditReward?id=...`
    - expect: Page shows a reward editing form

#### 2.2. EditReward page contains Title, Description and Status fields

**File:** `tests/MasterRewards/edit-reward.spec.ts`

**Steps:**
  1. Navigate to an EditReward page
    - expect: Inputs or textareas for reward title, description and status are visible

#### 2.3. Cancel on EditReward returns to Master Rewards list

**File:** `tests/MasterRewards/edit-reward.spec.ts`

**Steps:**
  1. Navigate to EditReward and click Cancel
    - expect: Browser navigates back to `/Rewards/`

### 3. Competitions – Index

**Seed:** `tests/auth.setup.ts`

#### 3.1. Competitions page loads after clicking sidebar link

**File:** `tests/Competitions/index.spec.ts`

**Steps:**
  1. From the Dashboard, click 'Competitions' in the Administration sidebar section
    - expect: Browser navigates to `/Competitions/`
    - expect: Page heading reads 'Competitions'

#### 3.2. Competitions DataTable is rendered with expected columns

**File:** `tests/Competitions/index.spec.ts`

**Steps:**
  1. Navigate to `/Competitions/` and inspect the table headers
    - expect: Column headers for 'Title', 'Start', 'End', 'Is open' are visible

#### 3.3. Add competition button is visible

**File:** `tests/Competitions/index.spec.ts`

**Steps:**
  1. Navigate to `/Competitions/`
    - expect: A button labelled 'Add competition' is present

#### 3.4. Show inactive button toggles to Show active and back

**File:** `tests/Competitions/index.spec.ts`

**Steps:**
  1. Navigate to `/Competitions/` and click the 'Show inactive' button
    - expect: After clicking 'Show inactive', the button label changes to 'Show active'
    - expect: URL query string contains `IncludeInactive=true`

#### 3.5. Clicking a competition row navigates to EditCompetition

**File:** `tests/Competitions/index.spec.ts`

**Steps:**
  1. Navigate to Competitions, wait for rows to load, click the first row or an edit action
    - expect: Browser navigates to `/Competitions/EditCompetition?id=...`
