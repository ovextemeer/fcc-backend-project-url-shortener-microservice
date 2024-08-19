require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// Use body parser middleware, dns module

let dns = require('dns');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Use body parser middleware, dns module

// Declare data

let urls = [];

// Declare data

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Start building project here

app.post("/api/shorturl", function (req, res) {
  let url = new URL(req.body.url);
  if (url.protocol !== "http:") {
    res.json({ error: 'invalid url' });
  } else {
    dns.lookup(url.hostname, function (err) {
      if (err) {
        res.json({ error: 'invalid url' });
      } else {
        urls.push(url.toString());
        urls.forEach((url, index) => {
          app.get(`/api/shorturl/${index + 1}`, function (req, res) {
            res.redirect(url);
          })
        });
        res.json({ original_url: url.toString(), short_url: urls.length });
      }
    });
  }
});

// End building project here

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
