const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const port = 8000

const { User, hashPassword } = require('./Model/UserModel')

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())

app.get('/ping', (req, res) => {
    res.send("This is a basic express app with ping route")
})

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection error: ", err))

app.get('/', (req, res) => {
    if(mongoose.connection.readyState === 1){
        res.send("Connected to MongoDB")
    }else{
        res.send("Did not connect to MongoDB")
    }
})

app.use('/api', require('./routes'))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post("/login", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing credentials" });
      }
  
      let user = await User.findOne({ $or: [{ username }, { email }] });
  
      if (user) {
        const hashedPassword = hashPassword(password, user.salt);
        if (user.password !== hashedPassword) {
          return res.status(400).json({ error: "Invalid credentials" });
        }
      } else {
        user = new User({ username, email, password });
        await user.save();
      }
  
      const token = 'dummytoken';
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
      });
  
      res.json({ message: "Login successful", token: token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.get("/check-login", (req, res) => {
    const token = req.cookies.token;
  
    if (token) {
      res.json({ isLoggedIn: true });
    } else {
      res.json({ isLoggedIn: false });
    }
  });
  
  app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  });

module.exports = app