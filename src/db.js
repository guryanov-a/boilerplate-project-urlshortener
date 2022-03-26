require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: Number, required: true },
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

const addUrl = async (address) => {
  const results = await ShortUrl.find({ originalUrl: address });

  console.log(results);
};

exports.ShortUrl = ShortUrl;
exports.addUrl = addUrl;