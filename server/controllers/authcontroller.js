const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/usersmodel");
const secretKey = "secret-key";
//signup a new user

const singup = async (req, res) => {
  const {
    name,
    email,
    password,
    usertype,
    phone,
    postoffice,
    city,
    street,
    pincode,
    state,
  } = req.body;

  try {
    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.status(201).json({ msg: "email already registered" });
    }

    const hashpassword = await bcrpyt.hash(password, 12);
    const newuser = await user.create({
      name,
      email,
      password: hashpassword,
      usertype,
      phone,
      postoffice,
      city,
      street,
      state,
      pincode,
    });
    const token = jwt.sign(
      { email: newuser.email, id: newuser._id },
      secretKey,
      { expiresIn: "1h" }
    );
    if (!newuser) {
     return res.status(404).json({ msg: "user not found..." });
    }
    res.status(200).json({ result: newuser, token });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

//login a existing user

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await user.findOne({ email });
    if (!existinguser) {
     return res.status(404).json({ msg: "email not registered" });
    }
    const validpassword = await bcrpyt.compare(password, existinguser.password);

    if (!validpassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      secretKey,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      result: existinguser,
      token,
      usertype: existinguser.usertype,
      id: existinguser._id,
    });
  } catch (error) {
   return res.status(400).json({ msg: "Something went wrong..." });
  }
};

module.exports = {
  login,
  singup,
};
