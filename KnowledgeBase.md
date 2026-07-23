User Story: All Sugar Factories Module – DE-Sugar.fintra.ai

User Story

As an authorized user of the DE-Sugar.fintra.ai platform, I want to securely log into the application and access a centralized dashboard where I can monitor all sugar factories, manage companies and factories, view production analytics, monitor device and camera performance, and access live production data so that I can efficiently supervise factory operations and make informed decisions.

Overview

The DE-Sugar.fintra.ai application provides a secure authentication mechanism that allows authorized users to access the system. The login page contains an Email field, a Password field, a password visibility (eye) icon, and a Sign In button. The user enters valid credentials, optionally verifies the password using the visibility toggle, and signs into the application. Upon successful authentication, the system redirects the user to the All Sugar Factories page, which serves as the application's default landing page.

The application consists of five primary modules available through the left sidebar: All Sugar Factories, Analytics, Reports, Priority Board, and Contact List. The All Sugar Factories module acts as the central management area for companies, factories, devices, and production monitoring.

Dashboard Behaviour

At the top of the All Sugar Factories page, the system displays summary cards representing the number of currently online factories, offline factories, and the total number of factories. Selecting any of these cards filters the factory listing according to the selected status, allowing users to quickly identify operational or non-operational factories.

Below the summary cards, the system provides a search facility along with two tabs: Companies and All Factories.

Company Management

When the Companies tab is selected, the application displays all registered companies. The search functionality enables users to locate a specific company quickly.

The Add Company button allows users to create a new company by entering a Company Name. Once saved successfully, the new company becomes available throughout the application.

Each company can be expanded to display all factories associated with it. This establishes a parent-child relationship in which the company acts as the parent entity and factories are maintained as child entities.

Factory Management

Selecting the All Factories tab displays every factory available in the system regardless of company.

Users can create new factories using the Add Factory button. While creating a factory, the system requires the user to enter a Factory Name and select an existing Company. Since every factory must belong to a company, selecting a parent company is mandatory.

Each factory record provides options to edit, delete, view operational status, and open detailed factory information.

Factory Status Monitoring

Users can review the operational status of a factory to determine its online and offline duration. The system provides both daily and monthly views, allowing users to analyse historical availability and downtime for any selected month.

Factory Details

Selecting View Detail opens the factory detail page.

The page displays the selected factory's information, including device count, current operational status, last online date and time, and an online/offline indicator. Online factories are represented using a green status indicator, while offline factories are represented using a red status indicator.

The page also provides filtering options that enable users to analyse production data using Specific Date, Entire Month, or Date Range filters.

After applying a filter, the system displays the selected day's production, monthly production, and cumulative production statistics according to the chosen criteria.

Camera Monitoring

Each factory may contain multiple cameras. The application displays individual tabs such as Camera 1, Camera 2, and Camera 3 based on the configured devices.

Selecting a camera presents daily and monthly production counts specific to that camera. The system also displays a production trend graph representing hourly production between 6:00 AM of the selected day and 6:00 AM of the following day. Hovering over any point on the graph displays the production count for that specific hour.

The application additionally provides a live video feed for each camera. Users can select the desired video resolution (360p, 720p, or 1080p) and frame rate (1 FPS, 5 FPS, 10 FPS, or 15 FPS) before initiating the live stream using the Go Live button.

The same functionality is available for every configured camera within the selected factory.

Device Management

Each factory maintains a separate Devices section that displays all devices associated with the selected factory.

Users can search existing devices or create new ones using the Add Device option.

While creating a device, the user specifies the Device Name and Device Type. Supported device types include Camera and Machine.

Device Performance

The Device Performance page enables users to analyse the health and utilisation of factory infrastructure.

Users select a specific date and apply the filter to retrieve performance metrics for that day.

The system displays graphical representations of Internet Speed, GPU Usage, CPU Usage, GPU Temperature, and CPU Temperature.

Users can download the generated performance report. The downloaded report contains information covering the production period from 6:00 AM of the selected day until 6:00 AM of the following day.

Performance Monitoring

The Performance module provides both Daily and Monthly monitoring capabilities.

The Daily view displays downtime information for a selected day, while the Monthly view allows users to analyse downtime across an entire month.

A graphical timeline illustrates the operational state of the factory. A value of 1 indicates the factory was operational, 0 represents a neutral state, and -1 indicates that the factory was offline. This visualization helps users identify downtime patterns throughout the selected period.

Acceptance Criteria

The system shall authenticate only valid users before granting access to the application.

The system shall redirect authenticated users to the All Sugar Factories page.

The dashboard shall display accurate counts for online, offline, and total factories.

Users shall be able to create, search, edit, and manage companies and factories.

Every factory shall belong to an existing company.

The system shall display accurate factory status information, including device count and last online timestamp.

Users shall be able to filter production data by specific date, entire month, and custom date range.

The application shall display daily, monthly, and camera-specific production statistics.

The production trend graph shall correctly represent hourly production between 6:00 AM and the following day's 6:00 AM.

Users shall be able to access live camera feeds using supported resolutions and frame rates.

Users shall be able to create and manage factory devices.

The application shall display device performance metrics and allow report downloads.

The system shall accurately display daily and monthly downtime information using graphical visualization.

User Story: Analytics, Reports, Priority Board, and Contact List Modules – DE-Sugar.Hydro.ai
User Story
As an authorized user of the DE-Sugar.Hydro.ai platform, I want to analyze production data, generate reports, monitor factory notifications, and manage factory contacts so that I can monitor factory performance, investigate operational issues, generate business reports, and communicate with responsible personnel efficiently.
Analytics Module
The Analytics module provides a centralized dashboard for analyzing production data across all registered sugar factories. Upon opening the page, the user is presented with a factory selection filter that lists all registered factories. By default, the system displays data for all factories; however, the user may select a specific factory to analyze its individual production performance.
In addition to the factory filter, the module provides a date filter that supports three modes of analysis: By Date, By Month, and By Year. Depending on the selected filter type, the user can retrieve production information for a single day, an entire month, or a complete year. Once the desired factory and date criteria have been selected, clicking the Apply Filter button refreshes the dashboard and displays production statistics relevant to the selected criteria.
The dashboard presents summary cards displaying the current day's production and the monthly production total. When historical data is selected, such as a previous month, the daily summary reflects the selected date while the monthly summary represents the total production for that entire month.
Below the summary cards, the system displays graphical representations of production data. A daily production bar chart illustrates production values on a day-by-day basis for the selected month. A monthly production chart summarizes production across the selected year or displays the selected month's aggregated production when appropriate. A line chart is also available to visualize production trends over time, enabling users to identify production patterns and compare performance throughout the selected period.
Reports Module
The Reports module enables users to generate and download production reports using multiple filtering options. Before generating a report, the user selects the required Fiscal Year. The fiscal year follows the organization's business calendar, beginning in July and ending in June of the following year. Each fiscal year is divided into four quarters, with each quarter representing a three-month period.
After selecting the fiscal year, the user specifies the required Company, Factory, and Production Line. These hierarchical filters ensure that reports are generated only for the selected business scope. Once all required filters have been configured, the user applies the filter to retrieve production records, which are displayed in a tabular format.
The Reports module provides a Download option that allows users to export the generated report in either Excel or PDF format. The exported report reflects the currently applied filters and contains only the relevant production information for the selected fiscal period.
Priority Board Module
The Priority Board serves as the centralized notification center for monitoring operational events across factories. The left panel displays all registered factories, allowing the user to select a specific factory for monitoring. Once a factory has been selected, the corresponding notifications are displayed on the right side of the page.
The module supports filtering notifications for a selected day, enabling users to review notifications generated during that specific date.
Notifications are categorized into five operational types. The All category displays every notification associated with the selected factory. The Device Connectivity category identifies devices that have lost connectivity. The Camera Connectivity category displays camera communication failures. The No Product Count category reports situations where no production has been detected for the configured monitoring interval, such as fifteen minutes. The Camera Obstruction category identifies situations where the camera view has been blocked or obscured, while the Camera Movement category detects unauthorized camera movement or position changes.
These categorized notifications help users identify operational issues quickly and take corrective action.
Contact List Module
The Contact List module enables users to maintain contact information for factory personnel responsible for production monitoring and operational support.
Users can create new contacts by selecting the Add Contact option. While creating a contact, the system requires the user to provide the Contact Name, Email Address, Contact Number, and the Factory with which the contact is associated.
Once saved successfully, the contact becomes available in the contact listing. The module also provides a search facility that enables users to quickly locate contacts when the number of records increases. If multiple pages of contacts exist, users can navigate through the paginated contact list to access additional records efficiently.
Business Rules
The Analytics module shall retrieve production information based on the selected factory and date filter. The Reports module shall generate reports only after all mandatory filters have been selected. The Priority Board shall display notifications only for the selected factory and selected date. The Contact List shall require all mandatory contact information before allowing a new contact to be created. Every contact shall be associated with an existing factory.
Acceptance Criteria
The system shall allow users to filter analytics by factory, date, month, and year. The dashboard shall display accurate production summaries and graphical visualizations based on the selected filters. Users shall be able to generate reports using fiscal year, company, factory, and production line filters and download reports in both Excel and PDF formats. The Priority Board shall display categorized notifications for the selected factory and date. Users shall be able to create, search, and manage factory contacts, with each contact linked to a valid factory.
Automation Scope (Playwright with JavaScript)
The automation framework will be developed using Playwright with JavaScript. Test automation should validate filter functionality, dashboard calculations, graph rendering, report generation and downloads, notification filtering, contact creation, search functionality, pagination, form validations, and overall navigation between sidebar modules. The framework should follow the Page Object Model (POM), include reusable utilities, robust assertions, stable element locators, and maintainable automation practices to support future regression testing.
