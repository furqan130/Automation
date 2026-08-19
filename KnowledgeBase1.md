# User Story: DE-Sugar Platform (All Sugar Factories, Analytics, Reports, Priority Board, and Contact List)

## User Story

As an authorized user of the DE-Sugar platform, I want to securely log into the application and access a centralized dashboard where I can manage companies, factories, devices, production analytics, reports, notifications, and factory contacts so that I can efficiently monitor factory operations, analyze production performance, generate business reports, respond to operational issues, and communicate with responsible personnel from a single platform.

## Overview

The DE-Sugar platform provides a secure authentication mechanism that allows authorized users to access the application using valid credentials. The login page contains an **Email** field, a **Password** field, a **Password Visibility (Eye)** toggle, and a **Sign In** button. After successful authentication, the user is redirected to the **All Sugar Factories** page, which serves as the default landing page.

The application consists of five primary modules accessible from the left navigation panel:

- All Sugar Factories
- Analytics
- Reports
- Priority Board
- Contact List

Together, these modules enable users to monitor production, manage organizational data, analyze performance, generate reports, monitor operational alerts, and maintain factory contacts.

---

# All Sugar Factories Module

The **All Sugar Factories** module serves as the central management area for companies, factories, devices, production monitoring, and factory performance.

At the top of the dashboard, the application displays summary cards showing the number of **Online Factories**, **Offline Factories**, and **Total Factories**. Selecting any card filters the factory list according to the selected status.

The page also provides a search option and two primary tabs:

- Companies
- All Factories

## Company Management

The **Companies** tab displays all registered companies.

Users can:

- Search companies.
- Create a new company using the **Add Company** option.
- Enter a unique Company Name.
- Save the company for immediate availability throughout the application.
- Expand a company to view all associated factories.

Each company acts as a parent entity, while factories are maintained as child entities.

## Factory Management

The **All Factories** tab displays every registered factory regardless of company.

Users can:

- Search factories.
- Create new factories.
- Edit factory information.
- Delete factories.
- View factory status.
- Open detailed factory information.

While creating a factory, the user must:

- Enter the Factory Name.
- Select an existing Company.

Every factory must belong to a valid company.

---

# Factory Status Monitoring

Users can review operational availability for each factory.

The system provides both **Daily** and **Monthly** status views, displaying online and offline durations for the selected period.

---

# Factory Details

Selecting **View Detail** opens the factory detail page.

The page displays:

- Factory information
- Device count
- Current operational status
- Last online date and time
- Online/Offline status indicator

Status indicators are displayed as:

- Green for Online
- Red for Offline

Users can filter production using:

- Specific Date
- Entire Month
- Date Range

After applying filters, the system displays:

- Daily Production
- Monthly Production
- Total Production

---

# Camera Monitoring

Each factory may contain multiple configured cameras.

Camera tabs are dynamically displayed, such as:

- Camera 1
- Camera 2
- Camera 3

Selecting a camera displays:

- Daily production
- Monthly production
- Hourly production trend

The production graph visualizes hourly production from **6:00 AM** on the selected day until **6:00 AM** the following day.

Hovering over graph points displays hourly production values.

Each camera also supports a live video stream.

Users can configure:

**Resolution**

- 360p
- 720p
- 1080p

**Frame Rate**

- 1 FPS
- 5 FPS
- 10 FPS
- 15 FPS

The live stream begins after selecting **Go Live**.

---

# Device Management

Each factory contains a dedicated **Devices** section.

Users can:

- Search devices.
- Add devices.
- Edit devices.
- Delete devices.

While creating a device, users must specify:

- Device Name
- Device Type

Supported device types include:

- Camera
- Machine

---

# Device Performance

The Device Performance page allows users to monitor infrastructure health.

After selecting a date, the system displays graphs for:

- Internet Speed
- GPU Usage
- CPU Usage
- GPU Temperature
- CPU Temperature

Users can download the performance report.

Downloaded reports cover production from **6:00 AM** on the selected day until **6:00 AM** the following day.

---

# Performance Monitoring

The Performance module supports both **Daily** and **Monthly** monitoring.

Daily monitoring displays downtime for a selected day.

Monthly monitoring displays downtime across the selected month.

A graphical timeline represents operational status:

- **1** = Factory Online
- **0** = Neutral State
- **-1** = Factory Offline

This visualization helps identify operational downtime patterns.

---

# Analytics Module

The Analytics module provides centralized production analysis for all registered factories.

Users can:

- Select All Factories or an individual factory.
- Filter production by:
  - Date
  - Month
  - Year

After applying filters, the dashboard refreshes and displays:

- Daily Production
- Monthly Production

The module also displays:

- Daily Production Bar Chart
- Monthly Production Chart
- Production Trend Line Chart

These visualizations help users analyze production trends and compare factory performance over time.

---

# Reports Module

The Reports module enables users to generate production reports using hierarchical filters.

Users must select:

- Fiscal Year
- Company
- Factory
- Production Line

The fiscal year begins in **July** and ends in **June** of the following year.

After applying filters, production records are displayed in a table.

Users can download reports in:

- Excel
- PDF

Downloaded reports include only the filtered production data.

---

# Priority Board Module

The Priority Board acts as the centralized notification center.

The left panel displays all factories.

Selecting a factory loads its notifications.

Users can filter notifications by date.

Notifications are categorized as:

- All
- Device Connectivity
- Camera Connectivity
- No Product Count
- Camera Obstruction
- Camera Movement

These notifications help users quickly identify operational issues requiring attention.

---

# Contact List Module

The Contact List module manages factory personnel information.

Users can create contacts by providing:

- Contact Name
- Email Address
- Contact Number
- Associated Factory

After saving, contacts appear in the listing.

The module also supports:

- Contact Search
- Pagination
- Contact Management

Every contact must be associated with an existing factory.

---

# Business Rules

- Only authenticated users shall access the application.
- Every factory shall belong to an existing company.
- Every contact shall be linked to a valid factory.
- Reports shall be generated only after all mandatory filters are selected.
- Analytics shall display production based on the selected factory and date criteria.
- Priority Board notifications shall be displayed only for the selected factory and date.
- Device performance reports shall cover the production period from **6:00 AM** of the selected day until **6:00 AM** of the following day.

---

# Acceptance Criteria

- The system shall authenticate only valid users.
- Successful login shall redirect users to the All Sugar Factories dashboard.
- The dashboard shall display accurate counts for online, offline, and total factories.
- Users shall be able to create, search, edit, and manage companies, factories, devices, and contacts.
- Every factory shall belong to an existing company.
- Every contact shall be associated with a valid factory.
- Factory details shall display accurate operational status, device count, and last online timestamp.
- Production data shall support filtering by Specific Date, Entire Month, Date Range, Month, and Year.
- Daily, monthly, and cumulative production statistics shall be displayed accurately.
- Camera production graphs shall correctly represent hourly production from **6:00 AM** to **6:00 AM** of the following day.
- Users shall be able to access live camera feeds using supported resolutions and frame rates.
- Device Performance shall display accurate infrastructure metrics and support report downloads.
- Analytics shall display accurate production summaries and graphical visualizations.
- Reports shall be generated using Fiscal Year, Company, Factory, and Production Line filters and downloaded in both Excel and PDF formats.
- The Priority Board shall display categorized notifications based on the selected factory and date.
- Contact List shall support contact creation, search, pagination, and management.

---

# Automation Scope (Playwright with JavaScript)

The automation framework shall be developed using **Playwright with JavaScript** following the **Page Object Model (POM)** architecture.

Automation shall cover:

- Login and authentication
- Sidebar navigation
- Dashboard validations
- Company management
- Factory management
- Factory status monitoring
- Factory details
- Camera monitoring
- Live streaming
- Device management
- Device performance
- Performance monitoring
- Analytics filters and graph validation
- Report generation and downloads
- Priority Board notification filtering
- Contact creation and management
- Search functionality
- Pagination
- Form validations
- Dashboard calculations
- API response validation
- File download verification
- End-to-end regression scenarios

The framework shall use reusable page objects, utility methods, robust assertions, stable locators, test data management, and maintainable coding practices to support long-term regression testing and future application enhancements.
