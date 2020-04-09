const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require('./routes/index')

const path = require("path");
const sqlite = require("sqlite");
const dbConnection = sqlite.open(path.resolve(__dirname, "banco.sqlite"), {
  Promise,
});

const port = process.env.PORT || 3000;

app.use("/admin", async (req, res, next) => {
  if (req.hostname === "localhost") {
    next();
  } else {
    res.redirect("/");
  }
});

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

app.use(routes(dbConnection))

const init = async () => {
  const db = await dbConnection;
  await db.run(
    "create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);"
  );
  await db.run(
    "create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);"
  );
};

init();

app.listen(port, (err) => {
  if (err) {
    console.log("Nao foi possivel iniciar o servidor");
  } else {
    console.log("Rodando o servidor");
  }
});
