import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const axios = require('axios');

const App = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get('/repos')
      .then((result) => {
        console.log(result.data);
        setRepos(result.data);
      })
      .catch((err) => console.log('error'));
  }, []);

  const search = (term) => {
    console.log(`${term} was searched`);
    axios.post('/repos', {username: term})
      .then(() => {
        return axios.get('/repos')
      })
      .then((response) => {
        console.log('to be displayed ', response.data)
        setRepos(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));