const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.status(401).json("Ошибка " + e.toString());
    }
  },
  getIdUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json("Ошибка " + error.toString());
    }
  },
  registrationUser: async (req, res) => {
    try {
      const { firstName, lastName, login, password, age } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const role = login === "admin@mail.ru" ? "admin" : "user";
      const image = "images/user/0604222022-114408_526-blank-avatar.jpg";
      const user = await User.create({
        firstName,
        lastName,
        login,
        password: hash,
        role,
        age,
        image,
      });
      res.json(user);
    } catch (e) {
      res.status(401).json("Ошика " + e.toString());
    }
  },
  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });
      if (!candidate) {
        res.status(401).json("неверный логин или пароль");
      }

      const valid = await bcrypt.compare(password, candidate.password);
      if (!valid) {
        res.status(401).json("неверный логин или пароль");
      }
      const payload = {
        id: candidate._id,
        role: candidate.role,
      };
      const token = await jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "28d",
      });
      res.json({
        token,
        id: candidate._id,
        role: candidate.role,
      });
    } catch (e) {
      res.status(401).json("Ошибка2 " + e.toString());
    }
  },
  changeUserPicture: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          image: req.file.path,
        }
      );
      const user = await User.findOne({_id: req.user.id})
      res.json(user);
    } catch (error) {
      res.status(401).json("Ошибка" + error.toString());
    }
  },
};
