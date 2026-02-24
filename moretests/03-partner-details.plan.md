# Partner Details (EditPartner) Test Plan

## Application Overview

The EditPartner page (`/Partners/EditPartner?PartnerId=X`) is the main partner configuration screen accessible to EzAdmin users via the 'Details' sidebar link. It uses a tabbed layout with the following tabs: Main, Levels, Socials, I18N, Level Mapping, Options, Integrations, AI Search/Meta, and AI Swim Lanes. Each tab contains forms that POST back to save data. A 'Clone partner' feature is also available. Tests navigate via the sidebar link from the Dashboard and use partner ID 1294237.

## Test Scenarios

### 1. Details – Page Load

**Seed:** `tests/auth.setup.ts`

#### 1.1. Page loads correctly after clicking Details in the sidebar

**File:** `tests/PartnerDetails/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237`, then click 'Details' in the sidebar
    - expect: Browser navigates to `/Partners/EditPartner?PartnerId=1294237`
    - expect: Page heading contains 'Partner Details' or the partner name
    - expect: Tab navigation bar with 'Main' tab active is visible

#### 1.2. All expected tabs are rendered in the tab bar

**File:** `tests/PartnerDetails/page-load.spec.ts`

**Steps:**
  1. Navigate to the EditPartner page and inspect the tab navigation bar
    - expect: Tabs labelled 'Main', 'Levels', 'Socials', 'I18N', 'Level Mapping', 'Options', 'Integrations' are all visible

#### 1.3. Main tab is active and visible by default

**File:** `tests/PartnerDetails/page-load.spec.ts`

**Steps:**
  1. Navigate to the EditPartner page and check tab pane visibility
    - expect: The 'Main' tab pane is shown and active
    - expect: Other tab panes are hidden

### 2. Details – Tab Navigation

**Seed:** `tests/auth.setup.ts`

#### 2.1. Clicking Levels tab shows the Levels pane

**File:** `tests/PartnerDetails/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the 'Levels' tab
    - expect: The Levels tab pane becomes visible
    - expect: The Main tab pane is no longer active

#### 2.2. Clicking Socials tab shows the Socials pane

**File:** `tests/PartnerDetails/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the 'Socials' tab
    - expect: The Socials tab pane becomes visible and contains social URL inputs

#### 2.3. Clicking I18N tab shows the I18N pane

**File:** `tests/PartnerDetails/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the 'I18N' tab
    - expect: The I18N tab pane becomes visible

#### 2.4. Clicking Options tab shows the Options pane

**File:** `tests/PartnerDetails/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the 'Options' tab
    - expect: The Options tab pane becomes visible and contains checkbox or toggle fields

#### 2.5. Clicking Integrations tab shows the Integrations pane

**File:** `tests/PartnerDetails/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the 'Integrations' tab
    - expect: The Integrations tab pane becomes visible

### 3. Details – Main Tab

**Seed:** `tests/auth.setup.ts`

#### 3.1. Main tab contains partner name input pre-filled with current value

**File:** `tests/PartnerDetails/main-tab.spec.ts`

**Steps:**
  1. Navigate to EditPartner page, Main tab is active by default
    - expect: An input for the partner name is visible and has a non-empty value

#### 3.2. Main tab Save button is present

**File:** `tests/PartnerDetails/main-tab.spec.ts`

**Steps:**
  1. Navigate to EditPartner, Main tab, and inspect for a Save or Submit button
    - expect: A save/submit button is visible on the Main tab

#### 3.3. Saving the Main tab with unchanged values does not produce an error

**File:** `tests/PartnerDetails/main-tab.spec.ts`

**Steps:**
  1. Navigate to EditPartner, leave all Main tab fields unchanged, and submit the form
    - expect: Page reloads or shows a success indicator without an error message

### 4. Details – Socials Tab

**Seed:** `tests/auth.setup.ts`

#### 4.1. Socials tab contains Facebook and Instagram URL inputs

**File:** `tests/PartnerDetails/socials-tab.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the 'Socials' tab
    - expect: Inputs named 'SocialFacebook' and 'SocialInstagram' are visible

#### 4.2. Socials tab contains all six social URL fields

**File:** `tests/PartnerDetails/socials-tab.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the 'Socials' tab
    - expect: Inputs for Facebook, Instagram, TikTok, LinkedIn, Twitter/X, and YouTube are all visible

### 5. Details – Clone Partner

**Seed:** `tests/auth.setup.ts`

#### 5.1. Clone partner button is visible on the EditPartner page

**File:** `tests/PartnerDetails/clone-partner.spec.ts`

**Steps:**
  1. Navigate to `/Partners/EditPartner?PartnerId=1294237`
    - expect: A button labelled 'Clone partner' or similar is rendered on the page

#### 5.2. Clicking Clone opens a confirmation modal or form

**File:** `tests/PartnerDetails/clone-partner.spec.ts`

**Steps:**
  1. Navigate to EditPartner and click the clone/copy button
    - expect: A modal or confirmation dialog appears asking for a new partner name or confirmation
