import moment from "moment";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);
const secret = "secret";

const users = [];

class UserController {

  static signup(req, res) {
    const {
      firstName, lastName, email, password, confirmPassword 
    } = req.body
    if (!firstName) {
      return res.status(400).json({
        status: 400,
        error: "Firstname is required"
      });
    }
    if (!lastName) {
      return res.status(400).json({
        status: 400,
        error: "Lastname is required"
      });
    }
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: "email is required"
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: "password is required"
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: "passwords do not match"
      });
    
    }

    const token = jwt.sign({ data: firstName }, secret, {
      expiresIn: "1h"
    });

    const userSchema = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      type: "user",
      dateRegistered: moment().format(),
      isAdmin: false,
      token
    };
    users.push(userSchema);
    return res.status(201).json({ status: 201, data: { ...userSchema } });
  }

  static signin(req, res) {
    const {
      firstName, lastName, email, password, confirmPassword 
    } = req.body

    if (!email) {
      return res.status(400).json({
        status: 400,
        error: "email is required"
      });
  }

  if (!password) {
    return res.status(400).json({
      status: 400,
      error: "password is required"
    });
}

  const token = jwt.sign({ data: firstName }, secret, {
    expiresIn: "1h"
  });


  const userSchema = {
    id: req.body.id,
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email,
    type: "user",
    isAdmin: false,
    token
  };
  return res.status(201).json({ status: 201, data: { ...userSchema } });
} 

}

export default UserController;
