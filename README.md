# HR Performance Dashboard

The HR Performance Dashboard is a responsive and feature-rich web application for HR teams to monitor employee performance, manage staff bookmarks, and visualize insights using modern web technologies.

---

## Features

- User authentication via DummyJSON API
- Dashboard displaying employee cards with full name, email, department, age, and performance rating
- Search functionality with real-time filtering by name, email, or department
- Multi-select dropdown filters by department and performance rating
- Dynamic user detail pages with tabbed sections (Overview, Projects, Feedback)
- Bookmark management with the ability to promote or assign employees
- Department-wise analytics and bookmark trends using Chart.js
- Dark and light mode toggle with persistent state
- Context API-based global state management
- Toast notifications for all major actions
- LocalStorage persistence for bookmarks and login session

---

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (or Yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard
npm install
npm run dev
Open http://localhost:3000 in your browser.

##Login Instructions
This project uses the DummyJSON API for authentication.

Use the following test credentials (or choose any valid DummyJSON user):

Note: After successful login, please manually refresh the page once if you notice missing or unloaded dashboard data. This ensures that state and localStorage are fully hydrated before fetches occur.