"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));
app.get('/hello', (req, res) => {
    res.send('Hello from Express on Firebase!');
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map