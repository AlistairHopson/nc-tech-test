const express = require("express");

const { getCards, getSingleCard } = require("./controller");

const app = express();
app.use(express.json());

app.set("json spaces", 2);

app.get("/cards", getCards);

app.get("/cards/:cardId", getSingleCard);

app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Not Found (Invalid Path)" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server Error" });
});

module.exports = app;
