# Authentication & Navigation Test Plan

## Application Overview

Tests covering authentication (login/logout), unauthenticated redirect behaviour, and sidebar navigation. The app uses Microsoft Identity with selectors `#Input_Email`, `#Input_Password`, and `#login-submit`. After login the user is taken to the Dashboard. The sidebar is split into role-dependent sections: "Current partner", "Wearables", "Points", "Gamification", "Administration", "Media" and "Reports". EzAdmin users see all sections; non-EzAdmin users see a reduced set. Tests use partner ID 1294237 ("Test Partner") as the working partner context.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/auth.setup.ts`

#### 1.1. Unauthenticated user is redirected to login page

**File:** `tests/Auth/login.spec.ts`

**Steps:**
  1. Navigate to the app root `/` without a stored auth state
    - expect: Browser URL contains `/Identity/Account/Login` or similar login route
    - expect: A login form is visible

#### 1.2. Login with valid credentials succeeds

**File:** `tests/Auth/login.spec.ts`

**Steps:**
  1. Navigate to the login page, fill `#Input_Email` and `#Input_Password` with valid credentials and click `#login-submit`
    - expect: Browser does not remain on a `/login` URL
    - expect: A page containing the sidebar nav is shown

#### 1.3. Login with invalid credentials shows an error

**File:** `tests/Auth/login.spec.ts`

**Steps:**
  1. Navigate to the login page, fill in a bad email/password and submit
    - expect: Browser stays on the login page
    - expect: An error message or validation summary is shown

#### 1.4. Logout link signs the user out and redirects to login

**File:** `tests/Auth/login.spec.ts`

**Steps:**
  1. Log in, then click the logout / account link in the header and confirm sign-out
    - expect: Browser is redirected to the login page or app root
    - expect: Navigating to a protected route redirects to login

### 2. Sidebar Navigation – Current Partner

**Seed:** `tests/auth.setup.ts`

#### 2.1. Brand logo link navigates to app root

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'EZ Admin' brand logo in the sidebar
    - expect: Browser navigates to `/` or the home page

#### 2.2. Dashboard sidebar link navigates to partner dashboard

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. Navigate to `/Partners/Dashboard?PartnerId=1294237` to establish partner context, then click the 'Dashboard' sidebar link
    - expect: Browser navigates to `/Partners/Dashboard?PartnerId=...`
    - expect: Page heading shows the partner name

#### 2.3. Details sidebar link navigates to EditPartner

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'Details' sidebar link (EzAdmin only)
    - expect: Browser navigates to `/Partners/EditPartner?PartnerId=...`
    - expect: Page heading reads 'Partner Details' or similar

#### 2.4. Users sidebar link navigates to the Users index

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'Users' sidebar link
    - expect: Browser navigates to `/Users/Index?PartnerId=...`
    - expect: Page heading reads 'Users'

#### 2.5. Partner rewards sidebar link navigates to Partner Rewards

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'Partner rewards' sidebar link
    - expect: Browser navigates to `/Partners/PartnerRewards/?PartnerId=...`

#### 2.6. White label sidebar link navigates to White Label page

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'White label' sidebar link
    - expect: Browser navigates to `/Partners/WhiteLabel?PartnerId=...`
    - expect: Page heading reads 'White label:'

#### 2.7. Referrals sidebar link navigates to Referrals page

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'Referrals' sidebar link
    - expect: Browser navigates to `/Partners/Referrals?PartnerId=...`

#### 2.8. Categories sidebar link navigates to Categories

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'Categories' sidebar link
    - expect: Browser navigates to `/Partners/Categories/Categories?PartnerId=...`

#### 2.9. Member level upgrades sidebar link navigates correctly

**File:** `tests/Navigation/sidebar-current-partner.spec.ts`

**Steps:**
  1. From the Dashboard, click the 'Member level upgrades' sidebar link (EzAdmin only)
    - expect: Browser navigates to `/Partners/MemberLevelUpgrades?PartnerId=...`

### 3. Sidebar Navigation – Administration

**Seed:** `tests/auth.setup.ts`

#### 3.1. Partners sidebar link navigates to Partners list

**File:** `tests/Navigation/sidebar-administration.spec.ts`

**Steps:**
  1. Navigate to the Dashboard, then click 'Partners' in the Administration section of the sidebar
    - expect: Browser navigates to `/Partners/`
    - expect: Page heading reads 'Partners'
    - expect: Add partner button is visible

#### 3.2. Master rewards sidebar link navigates to Rewards list

**File:** `tests/Navigation/sidebar-administration.spec.ts`

**Steps:**
  1. Click 'Master rewards' in the Administration sidebar section
    - expect: Browser navigates to `/Rewards/`
    - expect: Page heading reads 'Master rewards'

#### 3.3. Brands sidebar link navigates to Brands list

**File:** `tests/Navigation/sidebar-administration.spec.ts`

**Steps:**
  1. Click 'Brands' in the Administration sidebar section
    - expect: Browser navigates to `/Brands/`
    - expect: Page heading reads 'Brands'

#### 3.4. Competitions sidebar link navigates to Competitions list

**File:** `tests/Navigation/sidebar-administration.spec.ts`

**Steps:**
  1. Click 'Competitions' in the Administration sidebar section
    - expect: Browser navigates to `/Competitions/`
    - expect: Page heading reads 'Competitions'

#### 3.5. All users sidebar link navigates to Users without partner filter

**File:** `tests/Navigation/sidebar-administration.spec.ts`

**Steps:**
  1. Click 'All users' in the Administration sidebar section
    - expect: Browser navigates to `/Users/`
    - expect: Partner dropdown is visible (no PartnerId in query string)

#### 3.6. Logs sidebar link navigates to Logs Explorer

**File:** `tests/Navigation/sidebar-administration.spec.ts`

**Steps:**
  1. Click 'Logs' in the Administration sidebar section
    - expect: Browser navigates to `/Logs/LogsExplorer/`
    - expect: Page heading reads 'Logs'
    - expect: A table of log file entries is rendered
