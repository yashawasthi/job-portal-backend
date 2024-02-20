const mongoose = require('mongoose')

const PreviousWorkSchema = new mongoose.Schema(
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
      },
      { timestamps: true }
);


const model = mongoose.model("PreviousWork", PreviousWorkSchema)

module.exports = model
