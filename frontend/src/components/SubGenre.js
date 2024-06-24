import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const SubGenre = () => {
    const [data, setData] = useState([]);

  // 仮想的にデータを設定する useEffect
  useEffect(() => {
    // データベースから取得したデータを設定するイメージ
    const fetchedData = [
      { id: 1, name: 'おうどん'},
      { id: 2, name: 'たべたい'},
      { id: 3, name: 'ふ━━(　´_ゝ`)━(　´_ゝ`)━(　´_ゝ`)━━ん'},
    ];
    setData(fetchedData);
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>サブジャンル</th>
          </tr>
        </thead>
        <tbody>
          {data.map((Thread) => (
            <tr key={Thread.id}>
              <td><Link to={`/Thread/`}>{Thread.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SubGenre;