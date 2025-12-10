const express = require("express");
const router = express.Router();
const db = require("../db");

// Register
router.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;

    db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Registered Successfully");
        }
    );
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, result) => {
            if (err) return res.status(500).send(err);

            result.length > 0
                ? res.send(result[0])
                : res.status(401).send("Invalid Login");
        }
    );
});

module.exports = router;
