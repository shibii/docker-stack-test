require("dotenv").config();
const express = require("express");
const pgp = require("pg-promise")();

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("server middleware");
  next();
});

app.delete("/notes/:id", (req, res) => {
  console.log("delete /notes" + req.params.id);
  console.log(req.body);
  db.none("DELETE FROM notes WHERE id = $1", [req.params.id])
    .then((dbres) => {
      console.log(dbres);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/notes", (req, res) => {
  console.log("post /notes");
  console.log(req.body);
  if (req.body) {
    db.none("INSERT INTO notes(content) VALUES($1)", [req.body])
      .then((dbres) => {
        console.log(dbres);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }
});

app.get("/notes", (req, res) => {
  console.log("get /notes");
  console.log(req.body);
  db.any("SELECT * FROM notes")
    .then((dbres) => {
      console.log(dbres);
      res.status(200).json(dbres);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log("server listening on port " + process.env.SERVER_PORT);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("server closing");
  });
});
