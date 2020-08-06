const express = require("express");
const path = require("path");
const request = require("request");
const forecast = require("./forecast");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/../views"));
app.use(express.static(path.join(__dirname, "/..")));
app.use(express.json({ limit: "1mb" }));

app.get("", (req, res) => {
  // res.sendFile(path.join(__dirname + "/../pages/main.html"));
  res.render("main", {
    title: "Weather",
  });
});
app.get("/result", (req, res) => {
  // res.sendFile(path.join(__dirname + "/../pages/main.html"));
  res.render("result");
});
//api
app.get("/weather", (req, res) => {
  // res.sendFile(path.join(__dirname + "/../pages/main.html"));
  res.send("");
});
app.post("/weather", (req, res) => {
  //console.log(`body=${req.body}`);
  const address = req.body.address;
  forecast.reqLoc(address, (err, query) => {
    forecast.reqWeather(err, query, (obj) => {
      // console.log(`obj=${obj}`);
      res.json(obj);
    });
  });
});
//404 page not found
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page Not Found",
  });
});
app.listen(port, () => {
  console.log(`Server up on ${port}`);
});
