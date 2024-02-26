import React from 'react';
import '../Component/module11.css';

const dummyData = {
  "_id": { "$oid": "65d32dd08d035eecd7dcbbcf" },
  "Movie Title": "Aquaman",
  "Box Office Earnings": "$1,148 million",
  "Rating": "7"
};

const Module11 = () => {
  return (
    <div>
      <h2>{dummyData["Movie Title"]}</h2>
      <table className="entity-table">
        <tbody>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
          <tr>
            <td><strong>Box Office Earnings:</strong></td>
            <td>{dummyData["Box Office Earnings"]}</td>
          </tr>
          <tr>
            <td><strong>Rating:</strong></td>
            <td>{dummyData.Rating}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Module11;
