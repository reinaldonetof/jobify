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

const deleteVacancy = dbConnection => async(id) => {
  const db = await dbConnection;
  await db.run("delete from vagas where id = " + id);
}

const newVacancy = dbConnection => async({titulo, descricao, categoria}) => {
  const db = await dbConnection;
  await db.run(
    `insert into vagas(categoria, titulo, descricao) values(${categoria}, '${titulo}', '${descricao}')`
  );
}

const editVacancy = dbConnection => async({titulo, descricao, categoria}, id) => {
  const db = await dbConnection;
  await db.run(
    `update vagas set categoria = ${categoria}, titulo = "${titulo}", descricao = "${descricao}" where id=${id}`
  );
}

module.exports ={ 
  getVacancies,
  getVacancy,
  deleteVacancy,
  newVacancy,
  editVacancy
}