const Category = require("../models/category");

const homeCategories = dbConnection => async (req, res) => {
  const categorias = await Category.getCategories(dbConnection)();
  res.render("admin/categorias", {
    categorias
  });
}

const deleteCategory = dbConnection => async (req, res) => {
  Category.deleteCategory(dbConnection)(req.params.id);
  res.redirect("/admin/categorias");
}

const getNewCategory = dbConnection => (req, res) => {
  res.render("admin/nova-categoria");
}

const postNewCategory = dbConnection => async (req, res) => {
  await Category.newCategory(dbConnection)(req.body)  
  res.redirect("/admin/categorias");
}

const getEditCategory = dbConnection => async (req, res) => {
  const categoria = await Category.getCategory(dbConnection)(req.params.id)
  res.render("admin/editar-categoria", { categoria });
}

const postEditCategory = dbConnection => async (req, res) => {
  await Category.editCategory(dbConnection)(req.body.categoria,req.params.id)
  res.redirect("/admin/categorias");
}

module.exports = {
  homeCategories,
  deleteCategory,
  getNewCategory,
  postNewCategory,
  getEditCategory,
  postEditCategory
}