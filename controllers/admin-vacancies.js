const Category = require("../models/category");
const Vacancy = require("../models/vacancy");

const homeVacancies = dbConnection => async (req, res) => {
  const vagas = await Vacancy.getVacancies(dbConnection)();
  res.render("admin/vagas", {
    vagas
  });
}

const deleteVacancy = dbConnection => async (req, res) => {
  await Vacancy.deleteVacancy(dbConnection)(req.params.id)
  res.redirect("/admin/vagas");
}

const getNewVacancy = dbConnection => async (req, res) => {
  const db = await dbConnection;
  const categorias = await db.all("select * from categorias");
  res.render("admin/nova-vaga", { categorias });
}

const postNewVacancy = dbConnection => async (req, res) => {
  await Vacancy.newVacancy(dbConnection)(req.body);
  res.redirect("/admin/vagas");
}

const getEditVacancy = dbConnection => async (req, res) => {
  const categorias = await Category.getCategories(dbConnection)();
  const vaga = await Vacancy.getVacancy(dbConnection)(req.params.id);
  res.render("admin/editar-vaga", { categorias, vaga });
}

const postEditVacancy = dbConnection => async (req, res) => {
  await Vacancy.editVacancy(dbConnection)(req.body, req.params.id);
  res.redirect("/admin/vagas");
}

module.exports = {
  homeVacancies,
  deleteVacancy,
  getNewVacancy,
  postNewVacancy,
  getEditVacancy,
  postEditVacancy
}