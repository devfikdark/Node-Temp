import mongoose from 'mongoose';
import { DATABASE, DATABASE_PASSWORD } from './config';
// cloud connection-Str
const cloudDB = DATABASE.replace(
  '<password>',
  DATABASE_PASSWORD
);

mongoose.connect(cloudDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('DB connect success :)');
}).catch(() => {
  console.log('Something problem to connect DB !!!');
});