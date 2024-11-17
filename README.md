# Event Planner Frontend

This is the frontend of the Event Planner application, built using **React**, **Vite**, and **Material-UI (MUI)**. It provides an interface for users to manage their events, including creating, viewing, editing, and deleting events. The frontend also features responsive design for both desktop and mobile devices.

---

## Features

- **User Authentication**:
  - Login and signup with form validation.
  - Token-based authentication.

- **Event Management**:
  - Create, view, edit, and delete events.
  - Filter events by upcoming, past, and all categories.
  - Display events on a calendar or table.

- **Responsive Design**:
  - Mobile-friendly event cards.
  - Desktop-friendly table and calendar views.

---

## Tech Stack

- **React** with Vite for a modern and fast development environment.
- **Material-UI (MUI)** for consistent and customizable UI components.
- **Redux Toolkit** for state management.
- **React Router** for routing.
- **Date-fns** for date and time manipulation.

---

## Prerequisites

- **Node.js** (version 18 or later).
- **npm** or **Yarn** package manager.

---

## Installation

### 1. Clone the Repository
```bash
git clone git@github.com:veeaka/event-planner-fe.git
cd frontend
```

### Run with Docker

## 1. Start the Development Server

## Using docker-compose, you can easily start the development server:
```bash
docker-compose up --build
```
## This will build and run the frontend in a Docker container. The application will be accessible at http://localhost:3000.
## 2. Stop the Server

## To stop and remove the running container, use:
```bash
docker-compose down
```