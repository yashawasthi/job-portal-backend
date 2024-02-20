const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    startingYear:{
        type:Number,
        required: true,
    },
    endingYear:{
        type:Number,
        required: true,
    },
    technologiesUsed:{
        type:String,
        required: true,
    },
    url:{
      type:String,
  },
  },
  { timestamps: true }
);


const model = mongoose.model("Project", ProjectSchema)

module.exports = model
