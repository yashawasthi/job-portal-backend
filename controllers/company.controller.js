const User = require ('../models/user.model');
const Job = require ('../models/job.model');
const PreviousWork = require ('../models/previousWork.model');
const ImportantPeople = require ('../models/importantPeople.model');





exports.postJob = async (req, res) => {
  const newJob = new Job({ userId: req.body.id, ...req.body });
  try {
    await newJob.save();
    res.json ({status: 'ok'});
  } catch (err) {
    res.json ({status: 'error', error: 'Invalid Token'});
  }
};

exports.allJobs = async (req, res) => {
  try{
    const response = await Job.find ({}).populate("applicants","-__v");
    console.log(response)
    res.json (response);
  }
  catch(error){
    console.log(error)
  }
};


exports.getJob = async (req, res) => {
  const response = await Job.findById(req.body.id).populate({
    path : 'applicants',
    populate: [{
      path: 'workExperiences',
      model: 'WorkExperience'
  },
  {
      path: 'projects',
      model: 'Project'
  }]
  })

  console.log("Here")
  console.log(response)
  res.json (response);
};



exports.getCompany = async (req, res) => {
  const response = await User.findById(req.body.userId).populate("importantPeople","-__v").populate("previousWorks","-__v");
  console.log(response)
  res.json (response);
};




exports.addPreviousWork = async (req, res) => {

  const newWork = new PreviousWork({ userId: req.body.userId, ...req.body });
  try {
    const savedPreviousWork = await newWork.save();

    const response = await User.findByIdAndUpdate(req.body.userId,{
      $push: {
        previousWorks: savedPreviousWork._id
      }
    }).populate("previousWorks","-__v");
    console.log(response)
    res.json ("ok");
  } catch (error) {
    console.log(error)
  }
};


exports.setImportantPeople = async (req, res) => {

  const newPerson = new ImportantPeople({ userId: req.body.userId, ...req.body });
  try {
    const savedPerson = await newPerson.save();

    const response = await User.findByIdAndUpdate(req.body.userId,{
      $push: {
        importantPeople: savedPerson._id
      }
    }).populate("importantPeople","-__v");
    console.log(response)
    res.json ("ok");
  } catch (error) {
    console.log(error)
  }
};





exports.deletePreviousWork = async (req, res) => {
  console.log("Here")
  console.log("user" , req.body.userId)
  console.log("exp" , req.body.id)

  try { 
    await PreviousWork.findByIdAndDelete(req.body.id);
    const response = await User.findByIdAndUpdate(req.body.userId,{$pull: {previousWorks:{id:req.body.id}}})
    return res.json ({status: 'ok'});
  } catch (error) {
    console.log (error);
    res.json ({status: 'error', error: 'invalid token'});
  }
};

exports.deleteImportantPeople = async (req, res) => {
  console.log("Here")
  console.log("user" , req.body.userId)
  console.log("prj" , req.body.id)

  try { 
    await ImportantPeople.findByIdAndDelete(req.body.id);
    const response = await User.findByIdAndUpdate(req.body.userId,{$pull: {importantPeople:{id:req.body.id}}})
    return res.json ({status: 'ok'});
  } catch (error) {
    console.log (error);
    res.json ({status: 'error', error: 'invalid token'});
  }
};
