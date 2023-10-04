import express from 'express';
import cors from 'cors';
import "dotenv/config"


const app = express();


app.set('port', process.env.PORT|| 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

export default app;