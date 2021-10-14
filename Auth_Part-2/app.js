import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import authRouter from './routers/authRouter';
import authConfig from './controllers/authController';
import { SECRET } from './config/config';
const app = express();

/*** Social config ***/
// auth via google, github, linkedin 
authConfig(passport);

// use cookie
app.use(cookieParser());

// allow session
app.use(session({ secret: SECRET }));

// configure passport auth
app.use(passport.initialize());
app.use(passport.session()); 

// session & cookie save through flash
app.use(flash());

/*** Router ***/
app.use('/auth', authRouter);

export default app;
