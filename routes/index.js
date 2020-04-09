const init = (dbConnection) => {
  const Home = require("../controllers/home");
  const UserVacancy = require("../controllers/user-vacancy");
  const AdminHome = require("../controllers/admin-home");

  const router = require("express").Router();

  const categories = require('./categories')
  const vacancies = require('./vacancies')

  router.get("/", Home(dbConnection));
  router.get("/vaga/:id", UserVacancy(dbConnection));
  router.get("/admin", AdminHome);
  router.use("/admin/categorias", categories(dbConnection));
  router.use("/admin/vagas", vacancies(dbConnection));


  return router;
};

module.exports = init;
