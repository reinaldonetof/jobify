const init = (dbConnection) => {
  const Vacancies = require("../controllers/admin-vacancies");

  const router = require("express").Router();

  router.get("/", Vacancies.homeVacancies(dbConnection));
  router.get("/delete/:id", Vacancies.deleteVacancy(dbConnection));
  router.get("/nova", Vacancies.getNewVacancy(dbConnection));
  router.post("/nova", Vacancies.postNewVacancy(dbConnection));
  router.get("/editar/:id", Vacancies.getEditVacancy(dbConnection));
  router.post("/editar/:id", Vacancies.postEditVacancy(dbConnection));

  return router;
};

module.exports = init;
