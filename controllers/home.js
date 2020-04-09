const Category = require("../models/category");
const Vacancy = require("../models/vacancy");

const home = (dbConnection) => async (request, response) => {
  const categoriasDb = await Category.getCategories(dbConnection)();
  const vagas = await Vacancy.getVacancies(dbConnection)();
  const categorias = categoriasDb.map((cat) => {
    return {
      ...cat,
      vagas: vagas.filter((vaga) => vaga.categoria === cat.id),
    };
  });
  response.render("home", {
    categorias,
  });
};

module.exports = home;
