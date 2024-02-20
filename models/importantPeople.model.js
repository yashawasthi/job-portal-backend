const mongoose = require('mongoose')

const ImportantPeopleSchema = new mongoose.Schema(
    {
        userId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        imgUrl: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
);


const model = mongoose.model("ImportantPeople", ImportantPeopleSchema)

module.exports = model
