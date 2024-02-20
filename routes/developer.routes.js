const developerController = require ('../controllers/developer.controller');
const authJwt = require ('../middlewares/authJwt');

module.exports = app => {
  app.get('/api/allJobsForDeveloper',[authJwt.verifyToken],developerController.allJobsForDeveloper);
  app.post('/api/getJobForDeveloper',[authJwt.verifyToken],developerController.getJobForDeveloper);
  app.post('/api/applyJob',[authJwt.verifyToken],developerController.applyJob);

  app.post ('/api/setAboutDeveloper',[authJwt.verifyToken],developerController.setAboutDeveloper);
  app.post ('/api/addWorkExperience',[authJwt.verifyToken],developerController.addWorkExperience);
  app.post ('/api/addProject',[authJwt.verifyToken],developerController.addProject);
  app.post ('/api/deleteWorkExperience',[authJwt.verifyToken],developerController.deleteWorkExperience);
  app.post('/api/getDeveloper',[authJwt.verifyToken],developerController.getDeveloper);
  app.post('/api/deleteProject/',[authJwt.verifyToken],developerController.deleteProject);


};
