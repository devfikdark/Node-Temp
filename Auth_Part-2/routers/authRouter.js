const express = require('express');
const passport = require('passport');
const route = express.Router();

/*****  Google  ****/
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
route.get('/google', 
    passport.authenticate(
      'google', 
      { scope: ['profile', 'email'] }
    )
);

route.get('/google/callback', 
  passport.authenticate(
    'google', 
    {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/fail'
    }
));


/*****  Github  ****/
// send to github to do the authentication
// profile gets us their basic information including their name
// email gets their emails
route.get('/github', 
  passport.authenticate('github')
);

route.get('/github/callback', 
  passport.authenticate(
    'github', 
    {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/fail'
    }
));


/*****  Linkedin  ****/
// send to linkedin to do the authentication
// profile gets us their basic information including their name
// email gets their emails
route.get('/linkedin', 
  passport.authenticate('linkedin')
);

route.get('/linkedin/callback', 
  passport.authenticate(
    'linkedin', 
    {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/fail'
    }
));

/*****  Twitter  ****/
  // send to twitter to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  route.get('/twitter', 
    passport.authenticate('twitter'));

  route.get('/twitter/callback', 
    passport.authenticate(
      'twitter', 
      {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/fail'
      }
  ));

route.get('/success', (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    picture: req.user.picture
  })
});

route.get('/fail', (req, res) => {
  res.json({
    status: "failed",
    message: "Somthing Wrong !!!"
  })
});

module.exports = route;