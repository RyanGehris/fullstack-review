import React from 'react';
import Row from './RepoListRows.jsx'

const RepoList = ({ repos }) => {
  return (
    <div>
      <table border="1px">
        <thead>
          <tr>
            <th colSpan="2">Largest Repositories</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Repo Name</td>
            <td>Creator</td>
            <td>size</td>
          </tr>
          {repos.map((repo, index) => {
            return <Row key={index} repo={repo} />
          })}
        </tbody>
      </table>
    </div>
  )
}




export default RepoList;