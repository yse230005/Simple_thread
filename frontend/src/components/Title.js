import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Title.css'; // CSSファイルをインポート

const Title = () => {
  const [data, setData] = useState([]);

  // データの仮想的な設定
  useEffect(() => {
    const fetchedData_Genre = [
      { id: 1, name: '食べ物' },
      { id: 2, name: '行動' },
      { id: 3, name: '顔文字' },
      { id: 4, name: 'その他' },
    ];
    const fetchedData = [
      { id: 1, sub_id: 1, name: 'おうどん' },
      { id: 2, sub_id: 2, name: 'たべたい' },
      { id: 3, sub_id: 3, name: 'ふ━━(　´_ゝ`)━(　´_ゝ`)━(　´_ゝ`)━━ん' },
      { id: 4, sub_id: 1, name: 'りんご' },
      { id: 5, sub_id: 2, name: '走る' },
      { id: 6, sub_id: 3, name: '(´・ω・｀)' },
      { id: 7, sub_id: 4, name: '雑談' },
      { id: 8, sub_id: 4, name: '暇' },
    ];

    // fetchedData の sub_name を fetchedData_Genre の name に置き換える
    const updatedData = fetchedData.map(item => ({
      ...item,
      sub_name: fetchedData_Genre.find(genre => genre.id === item.sub_id)?.name || item.sub_name,
    }));

    setData(updatedData);
  }, []);

  // sub_id ごとにデータをグループ化する
  const groupedData = {};
  data.forEach((item) => {
    if (!groupedData[item.sub_id]) {
      groupedData[item.sub_id] = [];
    }
    groupedData[item.sub_id].push(item);
  });

  return (
    <div className="container">
      <h1>Simple_Theread</h1>
      <div className="grid-container">
        {Object.keys(groupedData).map((sub_id) => (
          <div key={sub_id} className="grid-item">
            <h2>{groupedData[sub_id][0].sub_name}</h2>
            <table>
              <tbody>
                {groupedData[sub_id].map((thread) => (
                  <tr key={thread.id}>
                    <td>
                    <Link to={`/SubGenre/${thread.id}`}>{thread.name}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Title;
