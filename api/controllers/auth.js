import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  //check if user exists
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.json(err);
    if (!result.length) return res.status(404).json("User not found");

    //extract user from result into a variable for easier access
    const user = result[0];

    //check password
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return res.status(401).json("Invalid password");

    //create and assign token
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    // remove password from user object
    const { password, ...data } = user;
    // send token in cookie and user data in response without password
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(data);
  });
};

export const register = (req, res) => {
  //check existing user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, result) => {
    if (err) return res.json(err);
    if (result.length) return res.status(409).json("User already exists");

    //hash password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES(?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, result) => {
      if (err) return res.json(err);
      return res.status(201).json("User created");
    });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("Logged out");
};
