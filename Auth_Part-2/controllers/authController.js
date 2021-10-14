import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LinkedinStrategy } from 'passport-linkedin-oauth2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import authModel from './../models/authModel';
import { 
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_CALLBACK_URL,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  TWITTER_CALLBACK_URL
} from './../config/config';

const authConfig = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  // used to deserialize the user
  passport.deserializeUser((user, cb) => {
   cb(null, user);
  });

  // Goggle 
  passport.use(new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL
    },
    function(token, refreshToken, profile, cb) {
      let user = {};
      process.nextTick(async() => {
        user.name = profile._json.name;
        user.email = profile._json.email;
        user.picture = profile._json.picture;
        let checkUser = await authModel.findOne({ email: user.email });
        if (!checkUser) {
          checkUser = await authModel.create(user);
        }
        return cb(null, user);
      });
    }
  ));

  // Github 
  passport.use(new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ['user:email']
    },
    function(token, refreshToken, profile, cb) {
      let user = {};
      process.nextTick(async() => {
        user.name = profile._json.name;
        user.email = profile.emails[0].value;
        user.picture = profile._json.avatar_url
        let checkUser = await authModel.findOne({ email: user.email });
        if (!checkUser) {
          checkUser = await authModel.create(user);
        }
        return cb(null, user);
      });
    }
  ));

  // Linkedin 
  passport.use(new LinkedinStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: LINKEDIN_CALLBACK_URL,
      scope: ['r_emailaddress', 'r_liteprofile']
    },
    function(token, refreshToken, profile, cb) {
      let user = {};
      process.nextTick(async() => {
        user.name = profile.displayName;
        user.email = profile.emails[0].value;
        user.picture = profile.photos[3].value;
        let checkUser = await authModel.findOne({ email: user.email });
        if (!checkUser) {
          checkUser = await authModel.create(user);
        }
        return cb(null, user);
      });
    }
  ));

  // Twitter 
  passport.use(new TwitterStrategy(
    {
      consumerKey: TWITTER_CLIENT_ID,
      consumerSecret: TWITTER_CLIENT_SECRET,
      callbackURL: TWITTER_CALLBACK_URL,
      includeEmail: true
    },
    function(token, refreshToken, profile, cb) {
      let user = {};
      process.nextTick(async() => {
        user.name = profile._json.name;
        user.email = profile._json.email;
        user.picture = profile._json.profile_image_url.replace('_normal','');
        let checkUser = await authModel.findOne({ email: user.email });
        if (!checkUser) {
          checkUser = await authModel.create(user);
        }
        return cb(null, user);
      });
    }
  ));
};

export default authConfig;
