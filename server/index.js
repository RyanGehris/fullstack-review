const express = require('express');
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop25 } = require('../database/index.js');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(400).send();
    } else {
      save(data, (err, result) => {
        if (err) {
          res.status(400).send();
        } else {
          res.status(201).send()
        }
      })
    }
  });
});

app.get('/repos', function (req, res) {
  getTop25()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(400).send()
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

