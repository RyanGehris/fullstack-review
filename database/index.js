const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });
const db = mongoose.connection;

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  owner: {login: String},
  full_name: String,
  size: Number,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

module.exports = {
  save: (data, callback) => {
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
    Repo.insertMany(data, (err, docs) => {
      if (err) {
        console.log('error in save: ', err);
        callback(err);
      } else {
        callback(null, docs);
      }
    })
  },

  getTop25: (callback) => {
    async function run() {
      try {
        const cursor = Repo.find().sort({ size: -1 }).limit(3);
        if ((await cursor.count()) === 0) {
          callback(true);
        } else {
          callback(null, cursor);
        }
      } finally {
        await client.close();
      }
    }
    run().catch((err) => callback(true));
  }
}