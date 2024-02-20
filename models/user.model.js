const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isDeveloper: {
      type: Boolean,
    },
    location:{
      type: String,
    },
    about:{
      type: String,
    },
    img: {
      type: String,
    },
    skills:{
      type:String
    },
    projects:{
      type: [{type:mongoose.Schema.Types.ObjectId,ref:"Project"}],
    },
    importantPeople:{
      type: [{type:mongoose.Schema.Types.ObjectId,ref:"ImportantPeople"}],
    },
    previousWorks:{
      type: [{type:mongoose.Schema.Types.ObjectId,ref:"PreviousWork"}],
    },
    workExperiences:{
      type: [{type:mongoose.Schema.Types.ObjectId,ref:"WorkExperience"}],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("User", UserSchema)

module.exports = model

