const indexRouter = require('../components/home/index.route');
const authRouter = require('../components/auth/auth.route');
const locationRouter = require('../components/location/location.route');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/location', locationRouter);
}