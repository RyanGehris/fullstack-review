const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });
const db = mongoose.connection;

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  owner: String,
  name: String,
  full_name: String,
  size: Number,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

module.exports = {
  save: (data, callback) => {
    Repo.insertMany(data, (err, docs) => {
      if (err) {
        console.log('error in save: ', err);
        callback(err);
      } else {
        callback(null, docs);
      }
    })
  },

  getTop25: () => {
    return Repo.find({}).sort({ size: -1 }).limit(25).exec();
  }
}