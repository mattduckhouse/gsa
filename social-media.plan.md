# Social Media Page Test Plan

## Application Overview

The Social media page (`/Partners/EditSocials?PartnerId=X`) is accessible to both EzAdmin and non-EzAdmin users (marked `[AllowExternalUsers]`). It presents a simple form to manage six social media URL fields for a partner: Facebook, Instagram, TikTok, LinkedIn, X (Twitter), and YouTube. Saving redirects to the Partner Dashboard. It is the 2nd sidebar link for non-EzAdmin users.

## Test Scenarios

### 1. Social Media – Page Load

**Seed:** `EnduranceZone.Admin.UI.Tests.FrontEnd/tests/seed.spec.ts`

#### 1.1. Page loads with correct heading

**File:** `tests/EditSocials/page-load.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X
    - expect: The page loads without errors
    - expect: The heading reads 'Edit partner: [PartnerName]'

#### 1.2. All six social media fields are visible

**File:** `tests/EditSocials/page-load.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X
    - expect: A Facebook input field is visible
    - expect: An Instagram input field is visible
    - expect: A TikTok input field is visible
    - expect: A LinkedIn input field is visible
    - expect: An X (Twitter) input field is visible
    - expect: A YouTube input field is visible

#### 1.3. Save and Cancel buttons are present

**File:** `tests/EditSocials/page-load.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X
    - expect: A 'Save' primary button is visible
    - expect: A 'Cancel' secondary button is visible

### 2. Social Media – Field Interactions

**Seed:** `EnduranceZone.Admin.UI.Tests.FrontEnd/tests/seed.spec.ts`

#### 2.1. Existing social media values are pre-populated

**File:** `tests/EditSocials/field-interactions.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X for a partner that has social URLs saved
    - expect: The fields display their current stored values rather than being empty

#### 2.2. Each field accepts free-text input

**File:** `tests/EditSocials/field-interactions.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X
    - expect: All six fields are enabled and editable
  2. Type a URL into each of the six fields
    - expect: Each field reflects the typed value

#### 2.3. Fields can be cleared

**File:** `tests/EditSocials/field-interactions.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X and clear the Facebook field
    - expect: The Facebook field is empty
  2. Click Save
    - expect: The form saves successfully
    - expect: On reload the Facebook field is empty

### 3. Social Media – Save Behaviour

**Seed:** `EnduranceZone.Admin.UI.Tests.FrontEnd/tests/seed.spec.ts`

#### 3.1. Saving valid URLs persists and redirects to Dashboard

**File:** `tests/EditSocials/save-behaviour.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X
    - expect: The page loads
  2. Enter 'https://facebook.com/test-partner' in Facebook and 'https://instagram.com/test-partner' in Instagram
    - expect: Both fields show the entered values
  3. Click the Save button
    - expect: The form submits without error
    - expect: The browser redirects to /Partners/Dashboard?PartnerId=X
  4. Navigate back to /Partners/EditSocials?PartnerId=X
    - expect: The Facebook field shows 'https://facebook.com/test-partner'
    - expect: The Instagram field shows 'https://instagram.com/test-partner'

#### 3.2. Saving all six social fields persists all values

**File:** `tests/EditSocials/save-behaviour.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X and fill all six fields with test URLs
    - expect: All six fields show their respective entered values
  2. Click Save
    - expect: Redirects to the Dashboard
  3. Navigate back to /Partners/EditSocials?PartnerId=X
    - expect: Facebook field retains its saved URL
    - expect: Instagram field retains its saved URL
    - expect: TikTok field retains its saved URL
    - expect: LinkedIn field retains its saved URL
    - expect: X (Twitter) field retains its saved URL
    - expect: YouTube field retains its saved URL

### 4. Social Media – Cancel Behaviour

**Seed:** `EnduranceZone.Admin.UI.Tests.FrontEnd/tests/seed.spec.ts`

#### 4.1. Cancel button navigates away without saving

**File:** `tests/EditSocials/cancel-behaviour.spec.ts`

**Steps:**
  1. Navigate to /Partners/EditSocials?PartnerId=X
    - expect: The page loads
  2. Enter an unsaved value in the Facebook field
    - expect: The field shows the new value
  3. Click the Cancel button
    - expect: The page navigates away from the Edit Socials page
  4. Navigate back to /Partners/EditSocials?PartnerId=X
    - expect: The Facebook field does not contain the previously entered unsaved value

### 5. Social Media – Navigation

**Seed:** `EnduranceZone.Admin.UI.Tests.FrontEnd/tests/seed.spec.ts`

#### 5.1. Social media sidebar link navigates to the correct page

**File:** `tests/EditSocials/navigation.spec.ts`

**Steps:**
  1. Log in as a non-EzAdmin user and navigate to the Partners Dashboard
    - expect: The sidebar 'Current partner' section is visible
  2. Click the 'Social media' link in the sidebar
    - expect: The URL changes to /Partners/EditSocials?PartnerId=X
    - expect: The heading reads 'Edit partner: [PartnerName]'
