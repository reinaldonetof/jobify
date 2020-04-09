const init = (dbConnection) => {
  const router = require("express").Router();
  const Categories = require("../controllers/admin-categories");

  router.get("/", Categories.homeCategories(dbConnection));
  router.get("/delete/:id", Categories.deleteCategory(dbConnection));
  router.get("/nova", Categories.getNewCategory(dbConnection));
  router.post("/nova", Categories.postNewCategory(dbConnection));
  router.get("/editar/:id", Categories.getEditCategory(dbConnection));
  router.post("/editar/:id", Categories.postEditCategory(dbConnection));

  return router
};

module.exports = init
