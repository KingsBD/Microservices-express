/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import setCorrelationId from '../middlewares/correlationId.middleware';
import { authRoutes } from '../modules/auth';
import serverErrorManager from '../utils/exeptions/server-errors.handler';

const app = express();

const arrAllowedOrigins = [process.env.BASE_URL, process.env.FRONT_URL];

if (process.env.DEV_FRONT_URL) {
  arrAllowedOrigins.push(process.env.DEV_FRONT_URL);
}

const corsOptions = {
  origin(origin: any, callback: any) {
    if (arrAllowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(bodyParser.json());

// CorrelationId
app.use(setCorrelationId());

// Routes
app.use('/auth', authRoutes);

// Errors
app.use(serverErrorManager);

export default app;
