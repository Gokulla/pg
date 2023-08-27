const express = require("express");
const cors = require("cors");

const app = express();

//Middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = require("./queries");

app.get("/", (req, res) => {
  res.json({ info: "Hi from node" });
});

app.get("/users", db.data);

app.post("/add", db.sentData);

const port = 9000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
