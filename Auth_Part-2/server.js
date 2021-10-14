import { PORT } from './config/config';
require('./config/dbConfig');

import app from './app';

const port = PORT || 3000;
app.listen(port , () => {
  console.log(`App run on ${port}`);
});