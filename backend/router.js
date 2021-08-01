const { isLoggedIn, isLoggedOut } = require("./middleware");
const { User } = require("./models/User");
const bcrypt = require("bcrypt");

// router
const router = (app, passport, api) => {
  const client = api({ apiKey: null });

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
        res.redirect("/login");
      });
    });
  });

  //podcast-api calls
  app.get("/api/search", (req, res) => {
    client
      .search({
        q: req.query.search,
        sort_by_date: 0,
        type: "episode",
        offset: req.query.offset,
        len_min: 10,
        len_max: 30,
        genre_ids: req.query.genres,
        published_before: 1580172454000,
        published_after: 0,
        only_in: "title,description",
        language: "English",
        safe_mode: 0,
      })
      .then((response) => {
        // Get response json data here
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get("/api/best_podcasts", (req, res) => {
    client
      .fetchBestPodcasts({
        genre_id: req.query.genres,
        page: 2,
        region: "us",
        safe_mode: 0,
      })
      .then((response) => {
        // Get response json data here
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  app.get("/api/get_podcast", (req, res) => {
    client
      .fetchPodcastById({
        id: req.query.podcast,
        next_episode_pub_date: 1479154463000,
        sort: "recent_first",
      })
      .then((response) => {
        // Get response json data here
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  app.get("/api/get_episode", (req, res) => {
    client
      .fetchEpisodeById({
        id: req.query.episode,
        show_transcript: 1,
      })
      .then((response) => {
        // Get response json data here
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  app.get("/api/just_listen", (req, res) => {
    client
      .justListen({})
      .then((response) => {
        // Get response json data here
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  app.get("/api/get_podcast_rec", (req, res) => {
    client
      .fetchRecommendationsForPodcast({
        id: req.query.podcast,
        safe_mode: 0,
      })
      .then((response) => {
        // Get response json data here
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  app.get("/api/get_episode_rec", (req, res) => {
    client
      .fetchRecommendationsForEpisode({
        id: req.query.episode,
        safe_mode: 0,
      })
      .then((response) => {
        // Get response json data here
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

module.exports = {
  router,
};
