require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const { URL } = require('url');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
});
shortUrlSchema.plugin(autoIncrement, { inc_field: 'shortUrl' });

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

const addUrl = async (urlObj) => {
  const result = await ShortUrl.findOne({ originalUrl: urlObj.toString() });

  if (result) {
    return result;
  }

  const shortUrl = new ShortUrl({ 
    originalUrl: urlObj.toString(),
  });

  return shortUrl.save();
};

const findUrl = async (urlId) => {
  return ShortUrl.findOne({ shortUrl: urlId });
};

exports.ShortUrl = ShortUrl;
exports.addUrl = addUrl;
exports.findUrl = findUrl;