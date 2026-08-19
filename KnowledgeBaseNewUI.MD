User Story – Overview Page

Module

Overview

Description

The Overview page serves as the default dashboard after a successful user login. It provides a high-level summary of the cement industry's operational and production data, enabling users to quickly monitor companies, factories, connectivity, production metrics, and top-performing factories from a single screen.

User Story

As an authorized user, I want to view an overview of all registered companies and factories so that I can monitor production, factory connectivity, and overall business performance without navigating to individual modules.

Business Objectives

- Provide a centralized dashboard for all registered companies and factories.
- Display real-time factory connectivity status.
- Present today's and the current month's production statistics.
- Highlight the top-performing factory for the current month.
- Provide production trends through charts.
- Allow users to analyze production distribution using factory breakdowns.
- Display the online/offline status of all factories grouped by company.
- Enable quick navigation to the Factories page.

Functional Requirements

Summary Cards

The dashboard shall display six summary cards:

1. Total Companies
   - Displays the total number of registered companies.

2. Total Factories
   - Displays the total number of factories.
   - Each factory belongs to a parent company.

3. Factory Connectivity
   - Displays:
     - Total Online Factories
     - Total Offline Factories

4. Today's Cement Bags
   - Displays the total cement bags produced on the current day.

5. Current Month Cement Bags
   - Displays the total cement bags produced during the current month.

6. Top Producer
   - Displays the factory with the highest production during the current month.
   - Shows:
     - Factory Name
     - Today's Production
     - Current Month Production

Production Charts

Daily Production

- Displays production for every day of the current month.
- X-axis represents the days of the month.
- Y-axis represents the production count.

Monthly Production

- Displays production for all twelve months.
- X-axis represents months.
- Y-axis represents production count.

Factory Breakdown

Users can click on any Daily or Monthly Production chart to open a detailed breakdown.

The breakdown modal contains:

Pie Chart

- Displays each factory's production contribution.
- Hovering over a section displays:
  - Factory Name
  - Production Count
  - Production Percentage

Factory Breakdown Table

Displays:

- Factory Name
- Production Count
- Production Percentage (Share)

The percentage is calculated based on the total production of all factories.

Factory Status

The Factory Status section displays:

- Total Online Factories
- Total Offline Factories

Factories are grouped under their parent companies.

Users can:

- Expand a company to view its factories.
- Scroll through the complete company/factory hierarchy.

View All

A View All button is available in the Factory Status section.

Clicking View All redirects the user to the Factories page.

User Story – Factories Module

Module

Factories

Description

The Factories module provides a centralized view of all registered companies and their associated factories. Users can search companies and factories, monitor their locations and live connectivity on a map, view production summaries, access factory-specific analytics, manage devices, monitor performance, and administer company and factory information.

User Story

As an authorized user, I want to view and manage all companies and factories from a single module so that I can monitor factory status, analyze production, manage devices, and quickly access detailed information for each factory.

Business Objectives

- Display all registered companies and factories.
- Allow users to search companies and factories.
- Visualize factory locations on an interactive map.
- Display live factory connectivity.
- Provide quick access to factory analytics.
- Allow authorized users to edit or delete company information.
- Monitor production and device performance for each factory.

Functional Requirements

1. Companies & Factories List

- Display all registered companies.
- Each company acts as the parent entity.
- Each company can contain one or more factories.
- Companies can be expanded or collapsed to view their factories.
- Display the total number of companies and factories.

2. Search

Users can search using:

- Company Name
- Factory Name

The search should support:

- Uppercase and lowercase characters.
- Spaces.
- Special characters.
- Hyphens (-).
- Dots (.).

Examples:

- A.A. Cotton Mills
- AL-Qadir Cotton Mills

Matching companies and factories should be displayed instantly.

3. Interactive Factory Map

Display all factories on a map based on their geographical location.

Hovering over a factory marker displays:

- Factory Name
- Online/Offline Status
- Total Devices
- Total Cameras
- Last Online/Offline Timestamp

4. Factory Status Filters

Provide three map filters:

- All
- Online
- Offline

Selecting a filter updates:

- Factory list
- Map markers

5. Factory Summary

Display:

- Total Cement Factories
- Online Factories
- Offline Factories

6. Factory Breakdown

Display production breakdown for:

- Daily Production
- Monthly Production

Each breakdown displays:

- Factory Name
- Production Count
- Production Percentage

7. Company Management

For each company, authorized users can:

- Edit Company
- Delete Company

8. Factory Actions

Each factory provides the following options:

A. Factory Status Graph

Displays factory connectivity history.

Supported filters:

- Daily
- Monthly

Daily View:

- Users can select any date.
- Display factory ON/OFF status throughout the selected day.

Monthly View:

- Users can select any month.
- Display factory status for every day of the selected month.

Graph Status:

- 1 (Green): Factory Online
- 0: Normal/Neutral
- -1 (Red): Factory Offline

B. Factory Analytics

Users can navigate to the selected factory's Analytics page.

Available navigation shortcuts:

- Factory Map
- Global Analytics

Supported filters:

- By Date
- By Month
- By Date Range

Display:

- Today's Total Cement Bags
- Current Month Cement Bags

Packer Line

Display all available cameras installed in the selected factory.

Users can select a camera to view:

- Today's Production
- Current Month Production

Hourly Production

Display hourly production data based on the selected filter.

When using the Month filter:

- A calendar allows users to select a specific day within the selected month to view hourly production.

C. Devices

Users can manage factory devices.

Add Device

Required fields:

- Device Name
- Device Type (Camera or Machine)

Users can create new devices.

Device Monitoring

For each device, users can monitor:

- GPU Usage
- CPU Usage
- GPU Temperature
- CPU Temperature
- Machine Information

Supported filter:

- Target Date

Users can download monitoring reports.

The report time range must follow the currently configured production schedule.

D. Performance

Users can monitor factory performance.

Supported filters:

- Daily
- Monthly

Performance metrics include:

- Downtime
- Downtime Percentage
- Factory Performance Statistics

Business Rules

- Only authenticated users can access this module.
- A company may contain multiple factories.
- Factory locations must be displayed accurately on the map.
- Search must support special characters, including hyphens and dots.
- Online and Offline filters update both the map and factory list.
- Device monitoring data must respect the configured production schedule.
- Downloaded reports must match the selected filters and configured production time.

Expected Outcome

The Factories module should provide a complete operational view of all companies and factories, enabling users to efficiently monitor factory connectivity, production, devices, and performance while supporting administration and navigation to detailed factory analytics.
User Story – Analytics Module

Module Name

Analytics

Description

The Analytics module provides users with consolidated production insights across all factories. It allows users to filter production data by factory and time period, monitor production trends, compare factory performance, and analyze production distribution through charts and breakdowns.

User Story

As an authorized user, I want to analyze production data for one or multiple factories using different time filters so that I can monitor daily and monthly production trends, compare factory performance, and make informed operational decisions.

Business Objectives

- Provide centralized production analytics for all factories.
- Allow users to filter production data by factory and time period.
- Display production summaries for the selected filters.
- Visualize production trends using graphs.
- Show factory-wise production contribution through a pie chart and detailed breakdown.

Functional Requirements

1. Factory Filter

Users can select a factory from the All Factories dropdown.

Features:

- Display all registered companies and factories.
- Search within the dropdown.
- Select a specific factory or view data for all factories.

2. Time Period Filter

The Analytics page supports the following filters:

- By Date
- By Month
- By Year

Selecting a filter automatically refreshes the dashboard. No Apply button is required.

A Reset Filter option restores the default view.

3. Production Summary Cards

The dashboard displays key production metrics based on the selected filters:

- Today's Cement Bags
  - Total cement bags produced for the selected date.

- Current Month Cement Bags
  - Total cement bags produced during the selected month.

4. Daily Production Chart

Displays production data for each day within the selected month.

Features:

- X-axis represents calendar days.
- Y-axis represents production volume (cement bags).
- Updates automatically when filters change.

5. Monthly Production Chart

Displays production totals for each month of the selected year.

Features:

- X-axis represents months.
- Y-axis represents production volume.
- Reflects the selected year or current year by default.

6. Production Trend Graph

Displays production trends based on the active filter.

Examples:

- By Date: Displays production for the selected day.
- By Month: Displays daily production within the selected month.
- By Year: Displays monthly production throughout the selected year.

The graph updates automatically whenever the user changes the selected filters.

7. Factory Breakdown

Displays production contribution for each factory based on the selected filters.

Pie Chart

Shows the percentage contribution of each factory to the total production.

Hovering over a pie slice displays:

- Factory Name
- Production Count
- Percentage Contribution

Breakdown Table

Displays:

- Factory Name
- Production Count
- Production Percentage

The percentage is calculated relative to the total production of all displayed factories.

Business Rules

- Only authenticated users can access the Analytics module.
- All production values are displayed in cement bags.
- Filters should update the dashboard immediately without requiring an Apply button.
- The Reset Filter option restores default analytics.
- All charts and summary cards must remain synchronized with the selected filters.
- Factory Breakdown should always represent the same filtered dataset shown in the summary cards and graphs.
- The sum of all factory percentages should equal approximately 100% (allowing minor rounding differences).

Expected Outcome

The Analytics module should provide users with accurate, real-time production insights through summary cards, interactive charts, and factory-wise breakdowns. Users should be able to quickly filter data, compare factory performance, and understand production trends across different time periods.

User Story – Reports Module

Module Name

Reports

Description

The Reports module enables authorized users to generate, view, filter, paginate, and export production reports across companies, factories, and production lines. It provides flexible filtering options based on predefined time periods or custom fiscal periods and allows users to download reports in PDF and Excel formats.

User Story

As an authorized user, I want to generate production reports using different date ranges and organizational filters so that I can analyze production data, review historical performance, and export reports for business analysis and record keeping.

Business Objectives

- Generate production reports using multiple time-based filters.
- Allow filtering by company, factory, and production line.
- Display production data in a structured, paginated table.
- Export reports in PDF and Excel formats.
- Ensure exported reports match the filtered data displayed on the screen.

Functional Requirements

1. Time Period Filter

The Reports page provides multiple time period options:

Predefined Filters

- Last 7 Days
- Last 30 Days
- Last 1 Year

Selecting one of these options automatically sets the corresponding date range.

Custom Time Filters

Users can also generate reports using:

- Fiscal Year
- Quarter

Supported quarters include:

- Q1 (January – March)
- Q2 (April – June)
- Q3 (July – September)
- Q4 (October – December)

The selected Fiscal Year and Quarter determine the reporting period.

2. Company Filter

- Users can search and select one or more companies.
- The dropdown supports searching by company name.
- Multiple company selection is supported.

3. Factory Filter

- Displays factories associated with the selected company or companies.
- Users can search and select one or more factories.
- Factory options update dynamically based on the selected company.

4. Production Line Filter

- Displays production lines available for the selected factory.
- If no production line is selected, the report includes data from all available production lines.
- Users may select one or more production lines.

5. Apply Filter

After selecting the desired filters, users click Apply Filter to generate the report.

The report table refreshes based on the selected criteria.

6. Report Table

The report displays the following columns:

- Serial Number
- Fiscal Year
- Month
- Date
- Day
- Company Name
- Factory Name
- Production Line
- Production Count

Each row represents production data for the selected filters.

7. Pagination

If the report contains multiple records, pagination is available.

Users can:

- Navigate to the Next page.
- Navigate to the Previous page.
- Select the number of rows displayed per page:
  - 10
  - 20
  - 50
  - 100

8. Report Export

Users can download reports in two formats:

PDF Export

The PDF report should include:

- Filter summary (where applicable)
- Complete production data
- Grand Total (overall production sum)

Excel Export

The Excel report should include:

- The same filtered data displayed on the screen
- All report columns
- Grand Total (overall production sum) at the end of the worksheet

The exported data must exactly match the applied filters and displayed report.

Business Rules

- Only authenticated users can access the Reports module.
- Company selection determines the available factories.
- Factory selection determines the available production lines.
- If no production line is selected, all production lines are included.
- The report table must always reflect the currently applied filters.
- Pagination should not alter the report results.
- PDF and Excel exports must contain the same dataset shown on the screen.
- The PDF and Excel reports must include the total production summary.
- Exported reports must respect the configured production-day timing (e.g., any administrator-defined production window).

Expected Outcome

The Reports module should allow users to efficiently generate accurate production reports using flexible filtering options, review results through a paginated table, and export identical data in PDF and Excel formats with complete production totals for reporting and analysis.

User Story – Notification Center

Module Name

Notification Center

Description

The Notification Center enables users to monitor, filter, analyze, and manage factory alerts. It provides real-time notifications, severity analysis, resolution tracking, and notification statistics for individual factories.

User Story

As an authorized user, I want to view, filter, analyze, and resolve factory notifications so that I can quickly identify operational issues, monitor their severity, and ensure timely resolution.

Business Objectives

- Display real-time notifications for selected factories.
- Allow users to filter notifications by type, status, severity, and date.
- Provide notification analytics and resolution statistics.
- Track notification trends and resolution performance.
- Maintain a complete notification history for operational monitoring.

Functional Requirements

1. Factory Selection

- Users can search and select a factory from the factory search dropdown.
- All notifications and analytics should update based on the selected factory.

2. Tabs

The Notification Center contains three tabs:

- Notifications
- Analytics
- Contact

---

Notifications Tab

Notification Type Filter

Users can filter notifications by:

- All Notifications
- GPU Unavailable
- Device Connectivity
- Camera Connectivity
- No Product Count
- Camera Obstruction
- Camera Movement

Selecting a notification type displays only the relevant alerts.

Status Filter

Users can filter notifications by:

- All Statuses
- Resolved
- Unresolved

Severity Filter

Users can filter notifications by:

- All
- High
- Medium
- Low

Date Filter

Users can select a specific date to view notifications generated on that day.

---

Analytics Tab

Severity Summary

Displays:

- Total Notifications
- High Severity
- Medium Severity
- Low Severity

Notification Summary

Displays:

- Total Notifications
- Resolved Notifications
- Unresolved Notifications
- Resolution Rate (%)
- Average Resolution Time
- Overdue Notifications (notifications open for more than 24 hours)

Analytics Filters

Users can analyze notification data using:

- By Date
- By Month
- Custom Date Range

Notifications Per Day

Displays notification trends over time.

Available filters:

- 1 Day
- 7 Days
- 30 Days
- Custom Date Range

Users can also filter by notification type.

Notification by Type

Displays a pie chart showing the distribution of notifications by type.

Supported notification types:

- GPU Unavailable
- Device Connectivity
- Camera Connectivity
- No Product Count
- Camera Obstruction
- Camera Movement

Resolution Reasons

When resolving a notification, users can select one of the predefined reasons:

- Restart Device
- Replace Camera
- Network Issue Resolved
- Camera Repositioned
- Camera Cleaned
- False Alarm
- Other

After selecting a reason, users can mark the notification as Resolved.

Business Rules

- Only authenticated users can access the Notification Center.
- Notifications must always belong to a specific factory.
- Analytics must reflect the selected filters.
- Resolution statistics must update immediately after resolving a notification.
- Overdue notifications are those unresolved for more than 24 hours.
- All charts and summaries must remain synchronized with the active filters.

Expected Outcome

The Notification Center should provide users with complete visibility into factory alerts, notification trends, severity levels, and resolution performance while enabling efficient incident management.

---

User Story – Contact List

Module Name

Contact List

Description

The Contact List module allows users to manage factory contact information for communication and operational coordination.

User Story

As an authorized user, I want to create, search, and manage factory contacts so that each factory has accurate contact information available for operational communication and notification management.

Business Objectives

- Maintain a centralized directory of factory contacts.
- Associate contacts with specific factories.
- Allow users to quickly search and manage contacts.

Functional Requirements

1. Search Contact

Users can search contacts using the contact name.

2. Factory Filter

Users can filter contacts by factory.

3. Add Contact

Clicking Add Contact opens a form with the following fields:

- Contact Name
- Email Address
- Physical Address
- Contact Number
- Factory Selection

Users can submit the form to create a new contact.

4. Contact Management

The system should display saved contacts and allow authorized users to view and manage them.

Business Rules

- Only authenticated users can access the Contact List.
- Every contact must be associated with a factory.
- Email addresses should be validated.
- Contact numbers should follow the required format.
- Required fields must be completed before submission.
- Newly added contacts should appear immediately in the contact list.

Expected Outcome

The Contact List module should provide an easy and reliable way to manage factory contact information, ensuring accurate communication details are available for all registered factories.
