import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));

app.get('/hello', (req, res) => {
  res.send('Hello from Express on Firebase!');
});

export const api = functions.https.onRequest(app);
