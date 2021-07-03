const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
const port = 20000;

app.get("/", (req, res) => {
    res.render("index");
    //res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/contact", (req, res) => {
    res.render("contact");
    
});

app.get("/search", (req, res) => {
    res.render("search");
    
});

app.get("/reviews", (req, res) => {
    res.render("reviews");
    
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
