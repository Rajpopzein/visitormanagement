import express, { json } from 'express';
import http from 'http';
import {config} from "dotenv"
import router from './routes/indexRoute.js';

const app = express();

config() // Load environment variables from a.env file

app.use(json());

app.use("/api/", router)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Api!</h1>');
  });

const Port = process.env.PORT || 3000;
http.createServer(app).listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});




