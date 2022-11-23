import React from 'react';

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
            return (
              <tr>
                <td>
                  <a href={repo.url}>{repo.name}</a>
                </td>
                <td>{repo.owner}</td>
                <td>{repo.size}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}




export default RepoList;