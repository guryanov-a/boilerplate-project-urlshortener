require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const router = express.Router();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

router.get("/is-mongoose-ok", function (req, res) {
  if (mongoose) {
    res.json({ isMongooseOk: !!mongoose.connection.readyState });
  } else {
    res.json({ isMongooseOk: false });
  }
});

const ShortUrl = require("./db.js").ShortUrl;
router.post("/mongoose-model", function (_, res) {
  // try to create a new instance based on their model
  // verify it's correctly defined in some way
 const shortUrl = new ShortUrl({
    originalUrl: 'originalUrl',
    shortUrl: 0
  });
  
  res.json(shortUrl);
});

app.use("/_api", router);

const addUrl = require("./db.js").addUrl;
app.post('/api/shorturl', async (req, res) => {
  const result = await addUrl('hello');
  
  res.json({ 
    greeting: 'short URL'
  });
});

app.get('/api/shorturl/:urlId', (req, res) => {
  res.json({ redirect: 'redirect' });
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
