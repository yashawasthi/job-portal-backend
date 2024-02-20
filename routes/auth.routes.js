const authController = require ('../controllers/auth.controller');

module.exports = app => {
  //login routes
  app.post ('/api/login', authController.login);

  //register route
  app.post ('/api/registerCompany', authController.registerCompany);

  app.post ('/api/registerDeveloper', authController.registerDeveloper);
};
