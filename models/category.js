const getCategories = dbConnection => async () => {
  const db = await dbConnection;
  const categories = await db.all("select * from categorias;");
  return categories
}

const deleteCategory = dbConnection => async(id) => {
  const db = await dbConnection;
  await db.run("delete from categorias where id = " + id);
}

const newCategory = dbConnection => async({categoria}) => {
  const db = await dbConnection;
  await db.run(`insert into categorias(categoria) values('${categoria}')`);
}

const getCategory = dbConnection => async(id) => {
  const db = await dbConnection;
  const categoria = await db.get(
    "select * from categorias where id = " + id
  );
  return categoria
}

const editCategory = dbConnection => async(categoria, id) => {
  const db = await dbConnection;
  await db.run(
    `update categorias set categoria = '${categoria}' where id=${id}`
  );
}

module.exports = {
  getCategories,
  deleteCategory,
  newCategory,
  getCategory,
  editCategory
}