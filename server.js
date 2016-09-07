'use strict';

const fs = require(`fs`);
const path = require(`path`);
const guestsPath = path.join(__dirname, `guests.json`);
const express = require(`express`);
const app = express();
const env = require(`dotenv`).config();
const port = process.env.PORT || 8000;

app.get(`/`, (req, res) => {
  res.send(`Hello World`);
});

app.get(`/guests`, (req, res) => {
  fs.readFile(guestsPath, `utf8`, (err, guestsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }
    const guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get(`/guests/:id`, (req, res) => {
  fs.readFile(guestsPath, `utf8`, (err, guestsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.send(guests[id]);
  });
});

app.listen(port, () => {
  console.log(`Listening on port:`, port);
});
