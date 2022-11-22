const axios = require('axios');
const { TOKEN } = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${TOKEN}`
    }
  };

  axios.get(options.url, options.headers)
    .then((response) => {
      const dataStore = [];
      response.data.forEach((dataObj) => {
        const newDataObj = {};
        let { id, owner, name, size, url, full_name } = dataObj;
        newDataObj.id = id;
        newDataObj.owner = owner.login;
        newDataObj.name =name;
        newDataObj.size = size;
        newDataObj.url = url;
        newDataObj.full_name = full_name;
        dataStore.push(newDataObj);
      });
      callback(null, dataStore);
    })
    .catch((error) => callback(error));
}

module.exports.getReposByUsername = getReposByUsername;