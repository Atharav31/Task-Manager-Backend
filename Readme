# Task Manager Application

## Backend

### Description

The backend of this application is built using **Express.js** and **NestJS**, providing RESTful APIs for managing tasks and user authentication. It includes user signup/login functionality, JWT-based authentication, and CRUD operations for tasks.

### Features

- **User Authentication:** JWT-based authentication for secure access.
- **Task Management:** CRUD operations for tasks.
- **Protected Routes:** Middleware to ensure only authenticated users can access certain endpoints.
- **Email Notifications:** Sends confirmation emails on user signup.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone <backend-repo-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   SMTP_HOST=<your-smtp-host>
   SMTP_PORT=<your-smtp-port>
   SMTP_USER=<your-smtp-username>
   SMTP_PASS=<your-smtp-password>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### API Endpoints

#### User Routes

- `POST /signup` - Register a new user.
- `POST /login` - Log in an existing user.
- `GET /logout` - Log out a user.
- `PUT /profile` - Update user profile (requires authentication).

#### Task Routes

- `POST /createTask` - Create a new task (requires authentication).
- `GET /getTask/:userId` - Retrieve all tasks for a user (requires authentication).
- `PUT /updateTask/:taskId` - Update a task (requires authentication).
- `DELETE /deleteTask/:taskId` - Delete a task (requires authentication).

### Folder Structure

```
backend/
|-- Controllers/
|   |-- UserController.js
|   |-- TaskManager.js
|-- Middlewares/
|   |-- Cookies.js
|-- Models/
|   |-- User.js
|   |-- Task.js
|-- Routes/
|   |-- api.js
|-- server.js
```

---

For any questions or issues, feel free to contact: atharavuttekar@gmail.com.
