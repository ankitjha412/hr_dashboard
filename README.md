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

Clone the repository:

git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard
npm install
npm run dev
Open http://localhost:3000 in your browser.

Login Instructions
This project uses the DummyJSON API for authentication.

Use the following test credentials (or choose any valid DummyJSON user):

Note: After successful login, please manually refresh the page once if you notice missing or unloaded dashboard data. This ensures that state and localStorage are fully hydrated before fetches occur.

###Screenshots
Dashboard View
![image](https://github.com/user-attachments/assets/fab97d75-ada4-48bb-ba52-99cfa70d5873)

Employee Detail Page
![image](https://github.com/user-attachments/assets/02654b1f-5624-44c8-a7bf-ab296167695a)

Bookmarks Page
![image](https://github.com/user-attachments/assets/e3c80a85-4e03-4818-ac5f-9f24b8d3b807)

Analytics Charts
![image](https://github.com/user-attachments/assets/8cbe1c8c-baa5-42f8-917d-aa1a9cb6c61f)



Technology Stack
Frontend Framework: Next.js (App Router)

Styling: Tailwind CSS

State Management: React Context API

Authentication API: DummyJSON

Data Visualization: Chart.js

UI Feedback: React Hot Toast

Folder Structure Overview

![image](https://github.com/user-attachments/assets/1918f45b-a348-4af3-9528-dd31f8e1e671)







