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
const { isLoggedIn, isLoggedOut } = require("./middleware");
dotenv.config();

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

// routes
app.get("/", isLoggedIn, (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/login", isLoggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error,
  };
  res.render("login", response);
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const exists = await User.exists({ username: req.body.username });

  if (exists) {
    console.log("exists");
    res.redirect("/");
    return;
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      const newAdmin = new User({
        username: req.body.username,
        password: hash,
      });

      newAdmin.save();
      console.log(newAdmin);

      res.redirect("/login");
    });
  });
});

// setup our admin user
// app.get("/setup", async (req, res) => {
//   const exists = await User.exists({ username: "admin" });

//   if (exists) {
//     console.log("exists");
//     res.redirect("/login");
//     return;
//   }

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash("pass", salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }

//       const newAdmin = new User({ username: "admin", password: hash });

//       newAdmin.save();
//       console.log(newAdmin);

//       res.redirect("/login");
//     });
//   });
// });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
