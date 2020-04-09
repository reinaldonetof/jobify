const Vacancy = require("../models/vacancy");

const userVacancy = (dbConnection) => async (request, response) => {
  const vaga = await Vacancy.getVacancy(dbConnection)(request.params.id);
  response.render("vaga", {
    vaga,
  });
};

module.exports = userVacancy;
