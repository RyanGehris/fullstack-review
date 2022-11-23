import React from 'react';

const Row = ({repo}) => {
  return (
    <tr>
      <td>
        <a href={repo.html_url}>{repo.name}</a>
      </td>
      <td>{repo.owner.login}</td>
      <td>{repo.size}</td>
    </tr>
  )
}

export default Row;