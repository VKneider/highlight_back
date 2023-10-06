import express from 'express';
import cors from 'cors';
import "dotenv/config"

import authRouter from './routes/auth.routes.js';


const app = express();


app.set('port', process.env.PORT|| 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use(authRouter);

export default app;