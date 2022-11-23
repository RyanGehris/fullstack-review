const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });
const db = mongoose.connection;

let repoSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    owner: { login: String },
    name: String,
    full_name: String,
    size: Number,
    html_url: String
 },
 { autoIndex: false }
);

let Repo = mongoose.model('Repo', repoSchema);

module.exports = {
  save: (data, callback) => {
    Repo.insertMany(data, (err, docs) => {
      if (err) {
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