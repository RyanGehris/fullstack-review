const express = require('express');
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop25 } = require('../database/index.js');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.post('/repos', function (req, res) {

  console.log('Request body: ', req.body)
  getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      console.log('error in app.post', err)
      res.status(400).send('Sorry');
    } else {
      // save data to DB
      console.log('Data in get repos ', data);
      save(data, (err, result) => {
        if (err) {
          console.log('error in app.post', err)
          res.status(400).send('Sorry');
        } else {
          res.status(201)
        }
      })
    }
  });
});

app.get('/repos', function (req, res) {
  getTop25((err, response) => {
    if (err) {
      console.log('Error in app.get: ', err);
      res.status(400);
    } else {
      console.log('WHAT DID WE GET ', response);
      res.status(201).send(response);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

