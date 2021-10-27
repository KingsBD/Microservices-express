import app from './app';
import { traceBegin, traceFilter, traceError } from './utils/logger';
import connectDB from './database/mongoDB';
import userDao from './modules/user/dao/user.dao';

(async function initApp() {
  try {
    traceBegin('App Start', 'App');
    await connectDB();
    if (process.env.MONDODB_DEFAULT_DATA === 'true')
      await userDao.createBaseUser();
    app.listen({ port: process.env.PORT }, () => {
      if (process.env.NODE_ENV === 'develop') {
        traceFilter(
          'App',
          `Server is working on PORT: ${process.env.PORT}`,
          'App',
        );
      } else {
        traceFilter('App', 'Server is working on "..."', 'App');
      }
    });
  } catch (error) {
    traceError('App', error, 'App');
  }
})();
