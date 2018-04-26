require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  massive = require("massive"),
  checkLoggedIn = require('./middleware'),
  ctrl = require('./Controller')

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING
} = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.use(express.static(__dirname + "./../build"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      //db calls
      const db = app.get("db");
      db.find_user([profile.id]).then(userResult => {
        if (!userResult[0]) {
          console.log(profile)
          db
            .create_user([profile.displayName, profile.id, profile.picture])
            .then(createdUser => {
              return done(null, createUser[0].id);
            });
        } else {
          return done(null, userResult[0].id);
        }
      });
      //arguments in an array with massive
    }
  )
);
passport.serializeUser((id, done) => {
  //takes whatever info (profile) and puts it on session, gets invoked once
  done(null, id);
}); ///runs once on login
//runs before each endpoint is hit, after login
passport.deserializeUser((id, done) => {
  //puts info on req.user
  app
    .get("db")
    .find_session_user([id])
    .then(loggedInUser => {
      done(null, loggedInUser[0]);
    });
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/dashboard",
    failureRedirect: "http://localhost:3000"
  })
);
app.get("/auth/me", function(req, res) {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send("nice try sucka!");
  }
});
// app.get("/auth/logout", (req, res) => {
//   req.logOut();
//   res.redirect("http://localhost:3000/");
// });
app.get('/auth/logout', function (req, res){
  req.session.destroy(function (err) {
    console.log('session ended')
    res.redirect('http://localhost:3000'); 
  });
});
app.get('/checkLoggedIn', checkLoggedIn);
app.patch('/api/user/patch/:id', ctrl.userPatch);


app.listen(SERVER_PORT, () => console.log(`listening on port: ${SERVER_PORT}`));
