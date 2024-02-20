const User = require ('../models/user.model');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');

exports.login = async (req, res) => {

  const user = await User.findOne ({
    email: req.body.email,
  }).populate("workExperiences","-__v").populate("projects","-__v");

  if (!user) {
    return {status: 'error', error: 'Invalid login'};
  }

  const isPasswordValid = await bcrypt.compare (
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign (
      {
        name: user.name,
        email: user.email,
        isDeveloper: user.isDeveloper,
      },
      'secret123'
    );
    const { password, ...others } = user._doc;
    others.user=token;
    return res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(others);
  } else {
    return res.json ({status: 'error', user: false});
  }
};

exports.registerCompany = async (req, res) => {
  // console.log (req.body);
  try {
    const newPassword = await bcrypt.hash (req.body.password, 10);
    await User.create ({
      name: req.body.name,
      email: req.body.email,
      isDeveloper: req.body.isDeveloper,
      about: req.body.aboutCompany,
      password: newPassword,
    });
    res.json ({status: 'ok'});
  } catch (err) {
    res.json ({status: 'error', error: 'Duplicate email'});
  }
};

exports.registerDeveloper = async (req, res) => {
  // console.log (req.body);
  try {
    const newPassword = await bcrypt.hash (req.body.password, 10);
    await User.create ({
      email: req.body.email,
      isDeveloper: req.body.isDeveloper,
      password: newPassword,
      name:req.body.name,
      userName: req.body.userName,
      location: req.body.address,
      skills: req.body.skills,
    });
    res.json ({status: 'ok'});
  } catch (err) {
    res.json ({status: 'error', error: 'Duplicate email'});
  }
};
