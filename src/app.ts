import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import errorHandler from './utils/error-handler';
import { connectDB } from './config/db';

const app: express.Express = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorHandler);

export default app;