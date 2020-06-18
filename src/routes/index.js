const indexRouter = require('@components/controllers/home/index.route');
const authRouter = require('@components/controllers/auth/auth.route');
const locationRouter = require('@components/controllers/location/location.route');
const notificationRouter = require('@components/controllers/notification/notification.route');
const childRouter = require('@components/controllers/users/child.route');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/location', locationRouter);
  app.use('/notification', notificationRouter);
  app.use('/users', childRouter);
}