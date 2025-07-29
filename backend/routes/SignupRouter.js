const express = require("express");
const {sign,login} = require("../controller/signupController");
const userRoute = express.Router();
userRoute.post('/signup', sign); // Changed to POST for signup
userRoute.post('/login', login);
module.exports = userRoute;