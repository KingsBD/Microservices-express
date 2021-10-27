// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongoose from 'mongoose';
import { traceBegin, traceEnd, traceError } from '../../utils/logger';

const connectDB = async () => {
  try {
    traceBegin('MongoDB Start', 'MongoDB');
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.MONGODB_URL_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    traceEnd('MongoDB End', 'MongoDB');
  } catch (err) {
    traceError('MongoDB', err, 'MongoDB');
  }
};

export default connectDB;
