const express = require ('express');
const app = express ();
const cors = require ('cors');
const mongoose = require ('mongoose');
const User = require ('./models/user.model.js');


require('dotenv').config({
  path:"./config.env"
});

app.use (cors ());
app.use (express.json ());

mongoose.connect (
  `${process.env.MONGO_URL}`,
  {useUnifiedTopology: true, useNewUrlParser: true}
);




require ('./routes/auth.routes') (app);

require ('./routes/company.routes') (app);

require ('./routes/developer.routes') (app);




const port=process.env.PORT || 3000
   
app.listen(port, () => {
 console.log(`App listening at port ${port}`);
});