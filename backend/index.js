// imports
const express = require("express");
const app = express();
const port = 5000;
const session = require("express-session");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const { User } = require("./models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const { router } = require("./router");
dotenv.config();
const { Client } = require("podcast-api");

// mongo connection
mongoose.connect(process.env.MONGO_DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// middleware
app.engine("hbs", hbs({ extname: "hbs" }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(err);
        }

        if (res === false) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
      });
    });
  })
);

router(app, passport, Client);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
