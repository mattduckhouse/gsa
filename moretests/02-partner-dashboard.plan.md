# Partner Dashboard Test Plan

## Application Overview

The Partner Dashboard (`/Partners/Dashboard?PartnerId=X`) is the landing page after selecting a partner. It displays the partner name and a grid of quick-link cards that navigate to child sections: Details/Social Media, Partner Rewards, White Label App, and Users. This page also establishes the current-partner session context used by all partner-scoped sub-pages. Tests use partner ID 1294237 ("Test Partner").

## Test Scenarios

### 1. Dashboard – Page Load

**Seed:** `tests/auth.setup.ts`

#### 1.1. Dashboard loads and shows the partner name in the heading

**File:** `tests/PartnerDashboard/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237`
    - expect: Browser is on the Dashboard URL
    - expect: A heading with the partner name (e.g. 'Test Partner') is visible

#### 1.2. Page does not redirect to login

**File:** `tests/PartnerDashboard/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237`
    - expect: URL does not contain 'login'
    - expect: Sidebar nav is rendered

#### 1.3. All expected quick-link cards are rendered

**File:** `tests/PartnerDashboard/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237` and inspect the card grid
    - expect: A 'Details' or 'Social Media' quick-link card is visible
    - expect: A 'Partner rewards' quick-link card is visible
    - expect: A 'White label app' quick-link card is visible
    - expect: A 'Users' quick-link card is visible

### 2. Dashboard – Quick Link Navigation

**Seed:** `tests/auth.setup.ts`

#### 2.1. Details quick-link navigates to EditPartner

**File:** `tests/PartnerDashboard/quick-links.spec.ts`

**Steps:**
  1. Navigate to the Dashboard, then click the 'Details' quick-link card
    - expect: Browser navigates to `/Partners/EditPartner?PartnerId=1294237`

#### 2.2. Partner rewards quick-link navigates to Partner Rewards

**File:** `tests/PartnerDashboard/quick-links.spec.ts`

**Steps:**
  1. Navigate to the Dashboard, then click the 'Partner rewards' quick-link card
    - expect: Browser navigates to `/Partners/PartnerRewards/?PartnerId=1294237`

#### 2.3. White label quick-link navigates to White Label page

**File:** `tests/PartnerDashboard/quick-links.spec.ts`

**Steps:**
  1. Navigate to the Dashboard, then click the 'White label app' quick-link card
    - expect: Browser navigates to `/Partners/WhiteLabel?PartnerId=1294237`
    - expect: Page heading contains 'White label'

#### 2.4. Users quick-link navigates to Users index

**File:** `tests/PartnerDashboard/quick-links.spec.ts`

**Steps:**
  1. Navigate to the Dashboard, then click the 'Users' quick-link card
    - expect: Browser navigates to `/Users/Index?PartnerId=1294237` or similar
    - expect: Page heading contains 'Users'

### 3. Dashboard – Partner Context

**Seed:** `tests/auth.setup.ts`

#### 3.1. Sidebar 'Current partner' section links carry the correct PartnerId after Dashboard visit

**File:** `tests/PartnerDashboard/partner-context.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237` and inspect the href attributes of sidebar links under 'Current partner'
    - expect: All 'Current partner' sidebar links contain `PartnerId=1294237` in their href

#### 3.2. Navigating to an invalid PartnerId returns an error or redirects gracefully

**File:** `tests/PartnerDashboard/partner-context.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=0`
    - expect: Page shows an error message or a redirect occurs rather than a silent empty state
