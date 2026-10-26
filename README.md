# Assignment 3 - Employee App Backend Integration

This repository contains the completed backend integration for the Employee App MERN stack application (Assignment 3).

## 📋 Requirements Overview

1. **Initiate App & Run Server at Port 3000** (`app.js`)
2. **MongoDB Atlas Connection** with error handling
3. **Employee Mongoose Schema & Model** (`name`, `location`, `position`, `salary`)
4. **REST APIs with Error Handling**:
   - `GET /api/employeelist` - Retrieve all employees from the database
   - `GET /api/employeelist/:id` - Retrieve a single employee by MongoDB `_id`
   - `POST /api/employeelist` - Add a new employee to the database
   - `PUT /api/employeelist` - Update an existing employee
   - `DELETE /api/employeelist/:id` - Delete an employee by `_id`
5. **Static File Serving & Single Page App Routing**:
   - Serves frontend build files from `dist/Frontend`
   - Wildcard route `app.get('/*', ...)` redirects all navigation to `dist/Frontend/index.html`

---

## 🛠️ Project Structure

```
Mern_3/
├── app.js             # Main Express backend server & Mongoose routes
├── package.json       # Project dependencies & scripts
├── .env.example       # Example environment variables
├── .env               # Local environment variables (MongoDB Atlas URI)
├── .gitignore         # Git ignore rules
├── README.md          # Project documentation
└── dist/
    └── Frontend/      # Production Angular frontend build
        ├── index.html
        ├── main.88ace857dbadf7a6eabc.js
        └── ...
```

---

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

Installed packages:
- `express`: Fast, unopinionated web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `cors`: Cross-Origin Resource Sharing middleware
- `dotenv`: Loads environment variables from `.env` file

### 2. Configure MongoDB Atlas Connection

Open the `.env` file and set your MongoDB Atlas connection string:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/EmployeeDB?retryWrites=true&w=majority
```
> Replace `<username>` and `<password>` with your actual MongoDB Atlas database user credentials.

### 3. Start the Server
```bash
npm start
```
Or with node directly:
```bash
node app.js
```

The application will be running at:
👉 **http://localhost:3000**

---

## 📡 API Reference

### 1. Retrieve all employees
- **Method**: `GET`
- **URL**: `/api/employeelist`
- **Response**: `200 OK`
```json
[
  {
    "_id": "653b6a9c8e4f1a2b3c4d5e6f",
    "name": "John Doe",
    "position": "Software Engineer",
    "location": "Kochi",
    "salary": 65000
  }
]
```

### 2. Retrieve single employee
- **Method**: `GET`
- **URL**: `/api/employeelist/:id`
- **Response**: `200 OK`
```json
{
  "_id": "653b6a9c8e4f1a2b3c4d5e6f",
  "name": "John Doe",
  "position": "Software Engineer",
  "location": "Kochi",
  "salary": 65000
}
```

### 3. Add new employee
- **Method**: `POST`
- **URL**: `/api/employeelist`
- **Body**:
```json
{
  "name": "Jane Smith",
  "position": "Full Stack Developer",
  "location": "Trivandrum",
  "salary": 75000
}
```
- **Response**: `200 OK`

### 4. Update employee
- **Method**: `PUT`
- **URL**: `/api/employeelist`
- **Body**:
```json
{
  "_id": "653b6a9c8e4f1a2b3c4d5e6f",
  "name": "Jane Smith",
  "position": "Senior Full Stack Developer",
  "location": "Bangalore",
  "salary": 95000
}
```
- **Response**: `200 OK`

### 5. Delete employee
- **Method**: `DELETE`
- **URL**: `/api/employeelist/:id`
- **Response**: `200 OK`
```json
{
  "message": "Employee deleted successfully"
}
```

---

## 📦 How to Push to GitHub for Submission

To submit your assignment GitHub repository link:

1. Initialize git and commit:
```bash
git init
git add .
git commit -m "Complete Assignment 3 - Employee App Backend Integration"
```

2. Create a new repository on [GitHub](https://github.com/new).

3. Link the remote and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

4. Copy the repository URL and submit it on Paatshala.
