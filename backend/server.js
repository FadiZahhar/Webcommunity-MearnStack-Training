const express = require("express");
const app = express();

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to Lebanese Web Community" })
);

// Define Routes
app.use("/api/users", require("./routes/auth.route"));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
