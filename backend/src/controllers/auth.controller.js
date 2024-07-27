const jwt = require("jsonwebtoken");
const { models } = require("../libs/sequelize");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validateUser = await models.User.findOne({ where: { email } });
    const user = validateUser.dataValues;
    if (!validateUser || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
    res.json({ accessToken });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};

const register = async (userData) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const validateUser = await models.User.findOne({ where: { email } });

  try {
    if (!validateUser) {
      const user = await models.User.create({
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
      });
      return user;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { login, register };
