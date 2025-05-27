# Student Feedback Management System

A full-stack web application for managing student feedback at Bahria University, built with Express.js and React.js.

## Features

- Student feedback submission form
- Admin dashboard for feedback management
- Subject-based feedback filtering
- Average rating calculations
- Secure admin access
- Responsive design with lilac theme

## Tech Stack

- **Frontend**: React.js, Material-UI, Axios
- **Backend**: Express.js, MongoDB, Mongoose
- **Authentication**: Simple password-based admin access

## Project Structure

```
student-feedback-system/
├── backend/           # Express.js backend
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── controllers/  # Route controllers
│   └── server.js     # Entry point
├── frontend/         # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── public/
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ADMIN_PASSWORD=your_secure_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

- `POST /api/feedback` - Submit new feedback
- `GET /api/feedbacks` - Get all feedback entries
- `GET /api/feedbacks/:subject` - Get feedback by subject
- `GET /api/average/:subject` - Get average rating by subject

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 