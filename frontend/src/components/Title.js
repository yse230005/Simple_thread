import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Title.css'; // CSSファイルをインポート

const Title = () => {
  const [data, setData] = useState([]);

  // データの仮想的な設定
  useEffect(() => {
    const MainGenreData = [
      { id: 1, name: '食べ物' },
      { id: 2, name: '行動' },
      { id: 3, name: '顔文字' },
      { id: 4, name: 'その他' },
    ];
    const SubGenreData = [
      { id: 1, Main_Genre_id: 1, name: 'おうどん' },
      { id: 2, Main_Genre_id: 2, name: 'たべたい' },
      { id: 3, Main_Genre_id: 3, name: 'ふ━━(　´_ゝ`)━(　´_ゝ`)━(　´_ゝ`)━━ん' },
      { id: 4, Main_Genre_id: 1, name: 'りんご' },
      { id: 5, Main_Genre_id: 2, name: '走る' },
      { id: 6, Main_Genre_id: 3, name: '(´・ω・｀)' },
      { id: 7, Main_Genre_id: 4, name: '雑談' },
      { id: 8, Main_Genre_id: 4, name: '暇' },
    ];

    // SubGenreData の sub_name を MainGenreData の name に置き換える
    const updatedData = SubGenreData.map(item => ({
      ...item,
      sub_name: MainGenreData.find(genre => genre.id === item.Main_Genre_id)?.name || item.sub_name,
    }));

    setData(updatedData);
  }, []);

  // Main_Genre_id ごとにデータをグループ化する
  const groupedData = {};
  data.forEach((item) => {
    if (!groupedData[item.Main_Genre_id]) {
      groupedData[item.Main_Genre_id] = [];
    }
    groupedData[item.Main_Genre_id].push(item);
  });

  return (
    <div className="container">
      <h1>Simple_Theread</h1>
      
      <div className="grid-container">
        {Object.keys(groupedData).map((Main_Genre_id) => (
          <div key={Main_Genre_id} className="grid-item">
            <h2>{groupedData[Main_Genre_id][0].sub_name}</h2>
            <table>
              <tbody>
                {groupedData[Main_Genre_id].map((thread) => (
                  <tr key={thread.id}>
                    <td><Link to={`/SubGenre/${thread.id}`}>{thread.name}</Link></td>
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

