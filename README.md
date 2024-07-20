# Personal Expense Tracker

## Overview

The Personal Expense Tracker application allows users to manage their expenses efficiently. Users can record their expenses, categorize them, and view summaries to gain insights into their spending habits. The application includes user account management, secure sessions, and comprehensive error handling.

## Table of Contents

1. [Features](#features)
2. [System Design and Architecture](#system-design-and-architecture)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Additional Notes](#additional-notes)

## Features

### User Management
- User registration and login.
- Secure session management.

### Expense Management
- Add new expense entries with `date`, `amount`, `category`, and `description`.
- View, edit, or delete existing expense entries.

### Category Management
- Categorize expenses (e.g., food, transportation, entertainment).
- Default categories provided; users can create custom categories.

### Summary and Insights
- View total spending for a given time period (daily, weekly, monthly).
- Display spending by category to identify high-expense areas.

### Design
- **Neumorphism:** The UI employs Neumorphism design principles for a modern, soft, and engaging user experience.
- **Dark and Light Mode:** The application supports both dark and light modes, allowing users to switch based on their preference.

## System Design and Architecture

### High-Level Design
- **Front-end:** React application for the client-side interface.
- **Back-end:** Node.js with Express for the server-side logic.
- **Database:** MongoDB for storing user and expense information.

### Data Flow
1. **User Actions:** Users interact with the React front-end.
2. **API Requests:** Front-end sends API requests to the Express back-end.
3. **Database Operations:** The back-end communicates with MongoDB to perform CRUD operations.
4. **Responses:** The back-end sends responses back to the front-end, which updates the UI accordingly.

## Technologies Used

- **Front-end:** React, Chakra UI for styling, React Router for navigation.
- **Back-end:** Node.js, Express.js.
- **Database:** MongoDB, Mongoose for object data modeling.
- **Authentication:** JWT for secure user sessions.

## Installation and Setup

### Prerequisites
- Node.js and npm installed.
- MongoDB installed and running.

### Steps

1. **Clone the repository:**
    ```bash
    https://github.com/Biswajeet-23/mern-personal-expense-tracker
    cd api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

5. **Run the front-end:**
    Navigate to the `client` directory and start the React application:
    ```bash
    cd client
    npm install
    npm run dev
    ```

## Usage

### Register and Login
- Register a new account or log in with existing credentials.

### Add Expense
- Navigate to the "Add Expense" section and fill in the required details.

### View and Manage Expenses
- View your expenses in the "Expenses" section.
- Edit or delete entries as needed.

### View Summary
- Access the "Summary" section to see your spending habits over different time periods.


### Deployed to Render (Front-end)
- Clik on the link to visit the live website [personal-expense-tracker](https://mern-personal-expense-tracker-frontend.onrender.com/)

## Additional Notes

### Error Handling
- The application includes comprehensive error handling to provide meaningful feedback to the user.

### Best Practices
- The code follows best practices for both front-end and back-end development, including security measures for handling user data and sessions.

### Future Enhancements
- Implement additional insights and analytics.
- Add support for recurring expenses and notifications.
