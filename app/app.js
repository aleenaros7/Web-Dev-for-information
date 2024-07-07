require("dotenv").config();
const express = require("express");
const User = require("./model/user");
const cors = require('cors');

const app = express();
app.use(cors())
const user = require('./routes/userRoutes'); // User ROUTES
// const alluser = require('./routes/dashboardRoutes'); // User ROUTES
// const admin = require('./routes/AdminRoutes'); // User ROUTES
app.use(express.json());
// Logic goes here
user(app);
// alluser(app); 
// admin(app);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});  
// EXPORT APP
module.exports = app;

  