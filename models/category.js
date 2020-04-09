const getCategories = db => async() => {
  const categories = await db.all("select * from categorias;")
  return categories
}

module.exports = {
  getCategories
}