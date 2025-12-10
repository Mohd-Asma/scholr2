const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", require("./routes/auth"));
app.use("/scholarships", require("./routes/scholarships"));
app.use("/applications", require("./routes/applications"));

app.listen(5000, () => console.log("Server running on port 5000"));
