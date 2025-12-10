const express = require("express");
const router = express.Router();
const db = require("../db");

// Add scholarship
router.post("/add", (req, res) => {
    const { title, description, amount, deadline } = req.body;

    db.query(
        "INSERT INTO scholarships (title, description, amount, deadline) VALUES (?, ?, ?, ?)",
        [title, description, amount, deadline],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Scholarship Added");
        }
    );
});

// Display all scholarships
router.get("/", (req, res) => {
    db.query("SELECT * FROM scholarships", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

module.exports = router;
