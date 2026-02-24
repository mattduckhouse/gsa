# Partner White Label Test Plan

## Application Overview

The White Label page (`/Partners/WhiteLabel?PartnerId=X`) allows customisation of the partner's white-label app. It is a heavily tabbed form with sections including: Branding, Colours, Mobile (EzAdmin only), Images, OAuth Client (EzAdmin only), Surveys/Data Capture (EzAdmin only), Swim Lane Panels (EzAdmin only), Swim Lane Styles (EzAdmin only), and CSS (EzAdmin only). It uses a code editor (ACE) on the CSS tab and a dropzone image uploader on the Images tab. Tests navigate via the sidebar 'White label' link from the Dashboard.

## Test Scenarios

### 1. White Label – Page Load

**Seed:** `tests/auth.setup.ts`

#### 1.1. Page loads after clicking White label in the sidebar

**File:** `tests/WhiteLabel/page-load.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237`, then click 'White label' in the sidebar
    - expect: Browser navigates to `/Partners/WhiteLabel?PartnerId=1294237`
    - expect: Page heading contains 'White label:'

#### 1.2. Branding tab is active by default

**File:** `tests/WhiteLabel/page-load.spec.ts`

**Steps:**
  1. Navigate to the White Label page and inspect the tab state
    - expect: The 'Branding' tab is marked active
    - expect: The Branding tab pane content is visible

#### 1.3. All expected tabs are rendered

**File:** `tests/WhiteLabel/page-load.spec.ts`

**Steps:**
  1. Navigate to the White Label page (as EzAdmin) and inspect tab bar items
    - expect: Tabs for 'Branding', 'Colours', 'Mobile', 'Images', 'OAuth Client', 'Surveys/Data Capture', 'Swim Lane Panels', 'Swim Lane Styles', 'CSS' are all present in the tab bar

### 2. White Label – Tab Navigation

**Seed:** `tests/auth.setup.ts`

#### 2.1. Clicking Colours tab shows colour-picker or input fields

**File:** `tests/WhiteLabel/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to White Label page and click the 'Colours' tab
    - expect: The Colours tab pane becomes visible
    - expect: At least one colour input or colour picker control is present

#### 2.2. Clicking Images tab shows upload controls

**File:** `tests/WhiteLabel/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to White Label page and click the 'Images' tab
    - expect: The Images tab pane becomes visible
    - expect: A dropzone or file input for image upload is present

#### 2.3. Clicking CSS tab shows the ACE code editor

**File:** `tests/WhiteLabel/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to White Label page and click the 'CSS' tab
    - expect: The CSS tab pane becomes visible
    - expect: The ACE editor container is present in the DOM

#### 2.4. Clicking Swim Lane Panels tab shows swim lane configuration

**File:** `tests/WhiteLabel/tab-navigation.spec.ts`

**Steps:**
  1. Navigate to White Label page and click the 'Swim Lane Panels' tab
    - expect: The Swim Lane Panels tab pane becomes visible

### 3. White Label – Save Behaviour

**Seed:** `tests/auth.setup.ts`

#### 3.1. Save button is present on the Branding tab

**File:** `tests/WhiteLabel/save-behaviour.spec.ts`

**Steps:**
  1. Navigate to the White Label page, Branding tab is shown by default
    - expect: A 'Save' or submit button is visible while the Branding tab is active

#### 3.2. Saving with unchanged values completes without an error

**File:** `tests/WhiteLabel/save-behaviour.spec.ts`

**Steps:**
  1. Navigate to White Label page, leave all Branding fields unchanged, and click Save
    - expect: No error message is shown
    - expect: Page reloads or a success toast/notification appears
