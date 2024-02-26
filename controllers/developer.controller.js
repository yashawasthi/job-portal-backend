const User = require ('../models/user.model');
const Job = require ('../models/job.model');
const WorkExperience = require ('../models/workExperience.model');
const Project = require ('../models/project.model');


exports.allJobsForDeveloper = async (req, res) => {
  try{
    const response = await Job.find ({}).populate("userId","-__v");
    console.log(response)
    res.json (response);
  }
  catch(error){
    console.log(error)
  }
};

exports.getJobForDeveloper = async (req, res) => {
  const response = await Job.findById(req.body.id).populate("userId","-__v");
  console.log(response)
  res.json (response);
};

exports.getDeveloper = async (req, res) => {
  const response = await User.findById(req.body.userId).populate("workExperiences","-__v").populate("projects","-__v");
  console.log(response)
  res.json (response);
};

exports.applyJob = async (req, res) => {
  console.log(req.body.id,req.body.userId)
  try{
    const response = await Job.findByIdAndUpdate(req.body.id,{
      $push: {
        applicants:req.body.userId
      },
    }).populate("applicants","-__v");
    console.log(response)
    res.json ("ok");
  }
  catch(error){
    console.log(error)
  }
};


exports.setAboutDeveloper = async (req, res) => {
  
  try{
    const response = await User.findByIdAndUpdate(req.body.userId,{
      $set: {
        about: req.body.about
      },
    })
    console.log(response)
    res.json ("ok");
  }
  catch(error){
    console.log(error)
  }
};


exports.addWorkExperience = async (req, res) => {

  const newExperience = new WorkExperience({ userId: req.body.userId, ...req.body });
  try {
    const savedExperience = await newExperience.save();
    const response = await User.findByIdAndUpdate(req.body.userId,{
      $push: {
        workExperiences: savedExperience._id
      }
    }).populate("workExperiences","-__v");
    console.log(response)
    res.json ("ok");
  } catch (error) {
    console.log(error)
  }
};

exports.addProject = async (req, res) => {

  const newProject = new Project({ userId: req.body.userId, ...req.body });
  try {
    const savedProject = await newProject.save();

    const response = await User.findByIdAndUpdate(req.body.userId,{
      $push: {
        projects: savedProject._id
      }
    }).populate("projects","-__v");
    console.log(response)
    res.json ("ok");
  } catch (error) {
    console.log(error)
  }
};


exports.deleteWorkExperience = async (req, res) => {
  console.log("Here")
  console.log("user" , req.body.userId)
  console.log("exp" , req.body.id)

  try { 
    await WorkExperience.findByIdAndDelete(req.body.id);
    const response = await User.findByIdAndUpdate(req.body.userId,{$pull: {workExperiences:{id:req.body.id}}})
    return res.json ({status: 'ok'});
  } catch (error) {
    console.log (error);
    res.json ({status: 'error', error: 'invalid token'});
  }
};

exports.deleteProject = async (req, res) => {
  console.log("Here")
  console.log("user" , req.body.userId)
  console.log("prj" , req.body.id)

  try { 
    await Project.findByIdAndDelete(req.body.id);
    const response = await User.findByIdAndUpdate(req.body.userId,{$pull: {projects:{id:req.body.id}}})
    return res.json ({status: 'ok'});
  } catch (error) {
    console.log (error);
    res.json ({status: 'error', error: 'invalid token'});
  }
};

