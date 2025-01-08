# ReadSphere Library Management System - Backend

<h2>Description:</h2>
This repository contains the backend of the ReadSphere Library Management System, a web application designed to manage library books, handle book borrowing, and provide user authentication. The backend is built using Node.js, Express, and MongoDB, with RESTful APIs for seamless integration with the frontend.

## Key Features

1. **Library Book Management**

   - Add, edit, and update books.
   - Retrieve all books or filter books by category.
   - Access the latest books with sorting and limit options.

2. **Book Borrowing Management**

   - Borrow books by users.
   - Retrieve borrowed books by user email.
   - Return books and update the borrowing status.

3. **User Authentication Integration JWT Integration**

   - Routes designed to integrate with user authentication for personalized data retrieval.

   - The backend uses JSON Web Tokens (JWT) for secure user authentication. Users must register and log in to receive a token, which is then used to access protected API endpoints.

4. **Filtering and Searching**

   - Filter books by category or retrieve user-specific borrowed books based on email.

5. **Database Operations**

   - Optimized MongoDB queries with upsert and sorting capabilities.
   - Ensure efficient data handling and avoid duplicate entries with query checks.

## API Endpoints

### Book Routes

- **GET** `/books/all-books` - Fetch all book records.
- **POST** `/books/add-book` - Add a new book record.
- **POST** `/books/filter-by-category` - Filter books by category.
- **POST** `/books/single-book` - Fetch details of a specific book by ID.
- **PUT** `/books/update-book/:id` - Update an existing book by ID.

### Book Borrowing Routes

- **GET** `/books/borrowed-book/:email` - Fetch all borrowed books for a user by email. (Tried to implement aggrigation.)
- **POST** `/books/borrow-book` - Borrow a new book for a user.
- **GET** `/books/return-book/:id` - Return a specific borrowed book by ID.

## NPM Packages Used

1. **express** - Web framework for building RESTful APIs.
2. **cors** - Enable Cross-Origin Resource Sharing.
3. **dotenv** - Manage environment variables.
4. **mongodb** - MongoDB client for database operations.
5. **jsonwebtoken** - Used for creating and verifying JSON Web Tokens (JWT) for secure user authentication.
6. **cookie-parser** - Middleware for parsing cookies, used to manage JWTs stored in cookies for user sessions.

### .env Setup
To securely manage environment variables, create a `.env` file in the root of your project and include the following:

`PORT = port number`
`DB_USER = username` 
`DB_Pass = db pass`

### Local Installation Guide

Follow the steps below to set up and run the backend of the **ReadSphere Library Management System** locally:

1. **Clone the repository:**
2. **Run npm install**
3. **Run npm run start for node or nopm run dev for nodemon**

