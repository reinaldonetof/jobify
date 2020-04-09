const getVacancies = dbConnection => async() => {
  const db = await dbConnection;
  const vagas = await db.all("select * from vagas;")
  return vagas
}

const getVacancy = dbConnection => async(id) => {
  const db = await dbConnection;
  const vaga = await db.get(
    "select * from vagas where id = " + id
  )
  return vaga
}

module.exports ={ 
  getVacancies,
  getVacancy
}