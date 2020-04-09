const getVacancies = db => async () => {
  await db.all("select * from vagas;")
}

module.exports = {
  getVacancies
}