// SubGenre.js
import './css/SubGenre.css'; // CSSファイルをインポート
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SubGenre = () => {
  const { id } = useParams(); // URLパラメータからidを取得

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchedData = [
      { id: 1, sub_id: 1, name: '朝ごはん' },
      { id: 2, sub_id: 1, name: '昼ごはん' },
      { id: 3, sub_id: 1, name: '夜ごはん' },
      { id: 4, sub_id: 3, name: '１２時暇な奴' },
      { id: 5, sub_id: 3, name: '好きな顔文字' },
      { id: 6, sub_id: 3, name: '(´・ω・｀)' },
      { id: 7, sub_id: 4, name: 'かか' },
      { id: 8, sub_id: 4, name: 'あ' },
    ];

    // フィルターして対応するsub_idのデータを抽出
    const filteredData = fetchedData.filter(item => item.sub_id.toString() === id);

    setData(filteredData);
  }, [id]);

  return (
    <div className="container">
      <h1>SubGenre Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubGenre;
