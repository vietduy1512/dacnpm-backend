const indexRouter = require('../components/home/index.route');
const authRouter = require('../components/auth/auth.route');
const locationRouter = require('../components/location/location.route');
const notificationRouter = require('../components/notification/notification.route');
const childRouter = require('../components/users/child.route');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/location', locationRouter);
  app.use('/notification', notificationRouter);
  app.use('/users', childRouter);
}