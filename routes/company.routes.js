const companyController = require ('../controllers/company.controller');
const authJwt = require ('../middlewares/authJwt');

module.exports = app => {
  app.post ('/api/postJob',[authJwt.verifyToken],companyController.postJob);
  app.get('/api/alljobs',[authJwt.verifyToken],companyController.allJobs);
  app.post('/api/getJob',[authJwt.verifyToken],companyController.getJob);
  app.post('/api/getCompany',[authJwt.verifyToken],companyController.getCompany);
  app.post ('/api/setImportantPeople',[authJwt.verifyToken],companyController.setImportantPeople);
  app.post ('/api/addPreviousWork',[authJwt.verifyToken],companyController.addPreviousWork);
  app.post('/api/deletePreviousWork/',[authJwt.verifyToken],companyController.deletePreviousWork);
  app.post('/api/deleteImportantPeople/',[authJwt.verifyToken],companyController.deleteImportantPeople);

};
