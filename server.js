const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/books", bookRoutes);

app.get("/", (req, res) => res.redirect("/books"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
