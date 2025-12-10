const express = require("express");
const router = express.Router();
const db = require("../db");

// Apply for scholarship
router.post("/apply", (req, res) => {
    const { student_id, scholarship_id } = req.body;

    db.query(
        "INSERT INTO applications (student_id, scholarship_id) VALUES (?, ?)",
        [student_id, scholarship_id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Application Submitted");
        }
    );
});

// View applications
router.get("/", (req, res) => {
    db.query(
        `SELECT applications.id, users.name, scholarships.title, applications.status
         FROM applications
         JOIN users ON users.id = applications.student_id
         JOIN scholarships ON scholarships.id = applications.scholarship_id`,
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        }
    );
});

module.exports = router;
