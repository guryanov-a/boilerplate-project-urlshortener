require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
});
shortUrlSchema.plugin(autoIncrement, { inc_field: 'shortUrl' });

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

const addUrl = async (address) => {
  const result = await ShortUrl.findOne({ originalUrl: address });

  console.log('result', result);

  if (result) {
    return result;
  }

  const shortUrl = new ShortUrl({ 
    originalUrl: address,
  });

  return shortUrl.save();
};

exports.ShortUrl = ShortUrl;
exports.addUrl = addUrl;