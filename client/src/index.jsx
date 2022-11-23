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
        setRepos(result.data);
      })
      .catch((err) => console.log('error'));
  }, []);

  const search = (term) => {
    axios.post('/repos', {username: term})
      .then(() => {
        return axios.get('/repos')
      })
      .then((response) => {
        setRepos(response.data);
      })
      .catch((err) => {
        alert('This user is already in the database')
      });
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