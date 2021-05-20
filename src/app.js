const express = require('express');
const helmet = require('helmet');
var xss = require('xss-clean');
const cors = require('cors');

const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const errorHandler = require('./middlewares/error');

const usersRouter = require('./routes/users');

module.exports = () => {
  const app = express();
  // security: set security headers
  app.use(helmet());

  // prevent cross site scripting
  app.use(xss());

  // Rate limiting
  const limiter = rateLimit({ windowms: 10 * 60 * 1000, max: 100 });
  app.use(limiter);

  // prevent http param pollution
  app.use(hpp());

  // enable cors
  app.use(cors());

  // cookie parser
  // app.use(cookieParser());

  // express middleware to parse incoming json
  app.use(express.json());

  app.use(usersRouter);

  //  catch all error middleware
  app.use(errorHandler);
  return app;
};
