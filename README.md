 Scholarship Management System

A full-stack web application where Admin can add/update/delete scholarships and Users can view/apply for scholarships.
Built using Node.js, Express, MySQL, HTML, CSS, JavaScript.

Features
 
**Admin Module**

Add new scholarships

Update scholarship details

Delete scholarships

View all scholarships

Manage user applications

** User Module**

View available scholarships

Apply for a scholarship

View application status

 Tech Stack
Layer	               Technology
Backend            	Node.js, Express.js
Database	             MySQL
Frontend	        HTML, CSS, JavaScript

**STRUCTURE**
scholarship-system/
│── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │    ├── adminRoutes.js
│   │    ├── userRoutes.js
│── public/
│   ├── index.html
│   ├── admin.html
│   ├── apply.html
│── package.json
│── README.md


**Installation (Local Setup)**

1️⃣ Install dependencies
npm install

2️⃣ Setup MySQL Database

Create a database named:

scholarship_db


Import the SQL file or create tables manually.

3️⃣ Configure database connection

Edit db.js:

const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "scholarship_db"
});
db.connect((err) => {
    if (err) console.log("DB Error:", err);
    else console.log("MySQL Connected!");
});
module.exports = db;

4️⃣ Run the backend server
node server.js


Your server runs on:

http://localhost:5000
