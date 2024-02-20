const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    userId:
    {
      type:mongoose.Schema.Types.ObjectId,ref:"User"
    }
      ,
    title: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    applicants: {
      type: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    },
    salaryMin:{
        type:Number,
        required: true,
    },
    salaryMax:{
        type:Number,
        required: true,
    },
    expMin:{
      type:Number,
      required: true,
  },
  expMax:{
      type:Number,
      required: true,
  },
  day:{
    type:Number,
    required: true,
  },
  location:{
  type:String,
  required: true,
  },
  status:{
  type:String,
  required: true,
  },
  },
  { timestamps: true }
);


const model = mongoose.model("Job", JobSchema)

module.exports = model
