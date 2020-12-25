require("dotenv").config();
const pgp = require("pg-promise")();

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const key = Math.random().toString(36).substring(2, 15);
const val = Math.random().toString(36).substring(2, 15);
const entry = { [key]: val };

console.log("inserting into database:");
console.log(entry);

db.none("INSERT INTO notes(content) VALUES($1)", [entry])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
