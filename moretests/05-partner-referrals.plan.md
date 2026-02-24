# Partner Referrals Test Plan

## Application Overview

The Referrals page (`/Partners/Referrals?PartnerId=X`) allows configuration of the partner's referral program. When no config exists, a "No Referral Configuration Found" empty state is shown with a "Create Referral Configuration" button. When a config exists, the page shows sections for panels, fields, privacy settings, FAQs, steps, and benefits. A "Reset to Defaults" warning button is also present. Tests navigate via the sidebar 'Referrals' link from the Dashboard.

## Test Scenarios

### 1. Referrals – Page Load

**Seed:** `tests/auth.setup.ts`

#### 1.1. Page loads after clicking Referrals in the sidebar

**File:** `tests/Referrals/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237`, then click 'Referrals' in the sidebar
    - expect: Browser navigates to `/Partners/Referrals?PartnerId=1294237`
    - expect: Page heading contains 'Referral Configuration:'

#### 1.2. Page heading shows the partner name

**File:** `tests/Referrals/page-load.spec.ts`

**Steps:**
  1. Navigate to the Referrals page and inspect the h3 heading
    - expect: The heading text includes the partner name (e.g. 'Test Partner')

#### 1.3. Reset to Defaults button is present

**File:** `tests/Referrals/page-load.spec.ts`

**Steps:**
  1. Navigate to the Referrals page and inspect the page header area
    - expect: A button labelled 'Reset to Defaults' is visible

### 2. Referrals – Empty State

**Seed:** `tests/auth.setup.ts`

#### 2.1. Empty state is shown when no referral config exists

**File:** `tests/Referrals/empty-state.spec.ts`

**Steps:**
  1. Navigate to the Referrals page for a partner known to have no referral config
    - expect: A message such as 'No Referral Configuration Found' is visible
    - expect: A 'Create Referral Configuration' button is shown

#### 2.2. Create Referral Configuration button triggers config creation

**File:** `tests/Referrals/empty-state.spec.ts`

**Steps:**
  1. From the empty state, click 'Create Referral Configuration' and wait for the page to update
    - expect: The empty state disappears
    - expect: Referral configuration sections or panels are now visible

### 3. Referrals – Existing Config

**Seed:** `tests/auth.setup.ts`

#### 3.1. Referral panels section is visible when config exists

**File:** `tests/Referrals/existing-config.spec.ts`

**Steps:**
  1. Navigate to Referrals page for a partner with an existing config
    - expect: A panels or sections list/editor is visible on the page

#### 3.2. Reset to Defaults button prompts confirmation before resetting

**File:** `tests/Referrals/existing-config.spec.ts`

**Steps:**
  1. Click the 'Reset to Defaults' button and observe the confirmation behaviour
    - expect: A confirmation dialog or modal appears before any data is wiped
    - expect: Dismissing the dialog leaves the config unchanged
