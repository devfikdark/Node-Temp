import jwt from 'jsonwebtoken';
import catchAsync from '../util/catchAsync';
import AppError from '../util/appError';
import User from '../models/userModel';

// Make JWT token
const createToken = id => {
  return jwt.sign({
      id
    },
    process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

const sendCreateToken = (user, status, res) => {
  const myToken = createToken(user._id);
  res.status(status).json({
    status: "ok",
    token: myToken,
    user
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  let createUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phone: req.body.phone
  });

  try {
    createUser.password = undefined; // hide pass from response
    sendCreateToken(createUser, 201, res);
  } catch (error) {
    return next(
      new AppError(
        'Somthing problem here!!!',
        500
      )
    );
  }
});

export const logIn = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');
  
  const {
    email,
    password
  } = req.body;

  // Check email and password exist
  if (!email || !password) {
    return next(
      new AppError(
        'provide email and password',
        400
      )
    );
  }

  // Check if user exists & password is correct
  let user = await User.findOne({
    email
  }).select('+password');
  if (!user || !(await user.comparePassword(password, user.password))) {
    sendMessage(res, 401, "Incorrect email or password")
  }

  try {
    // response data
    user.password = undefined; // hide pass from response
    sendCreateToken(user, 200, res);
  } catch (error) {
    return next(
      new AppError(
        'Somthing problem here!!!',
        500
      )
    );
  }
});

const sendMessage = (res, status, message) => {
  res.status(status).json({
    status: "failed",
    message: message
  });
};