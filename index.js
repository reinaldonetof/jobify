const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const Home = require("./controllers/home");
const UserVacancy = require("./controllers/user-vacancy");
const AdminHome = require("./controllers/admin-home");
const Categories = require("./controllers/admin-categories");
const Vacancies = require("./controllers/admin-vacancies");

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

app.get("/", Home(dbConnection));
app.get("/vaga/:id", UserVacancy(dbConnection));

// <-- Rotas de Categorias Admin -->
app.get("/admin", AdminHome);
app.get("/admin/categorias", Categories.homeCategories(dbConnection));
app.get(
  "/admin/categorias/delete/:id",
  Categories.deleteCategory(dbConnection)
);
app.get("/admin/categorias/nova", Categories.getNewCategory(dbConnection));
app.post("/admin/categorias/nova", Categories.postNewCategory(dbConnection));
app.get(
  "/admin/categorias/editar/:id",
  Categories.getEditCategory(dbConnection)
);
app.post(
  "/admin/categorias/editar/:id",
  Categories.postEditCategory(dbConnection)
);

// <-- Rotas de Vagas Admin -->
app.get("/admin/vagas", Vacancies.homeVacancies(dbConnection));
app.get("/admin/vagas/delete/:id", Vacancies.deleteVacancy(dbConnection));
app.get("/admin/vagas/nova", Vacancies.getNewVacancy(dbConnection));
app.post("/admin/vagas/nova", Vacancies.postNewVacancy(dbConnection));
app.get("/admin/vagas/editar/:id", Vacancies.getEditVacancy(dbConnection));
app.post("/admin/vagas/editar/:id", Vacancies.postEditVacancy(dbConnection));

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
