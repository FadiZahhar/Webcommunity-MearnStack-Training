const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db.config");

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to Lebanese Web Community" })
);

// Define Routes
app.use("/api/auth", require("./routes/auth.route"));

app.use("/api/users", require("./routes/users.route"));

app.use("/api/contacts", require("./routes/contacts.route"));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
