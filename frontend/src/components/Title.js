import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Title.css'; // CSSファイルをインポート

const Title = () => {
  const [data, setData] = useState([]);

  // データの仮想的な設定
  useEffect(() => {
    const MainGenreData = [
      { id: 1, name: 'ジャンル１' },
      { id: 2, name: 'ジャンル２' },
      { id: 3, name: 'ジャンル３' },
      { id: 4, name: 'ジャンル４' },
    ];
    const SubGenreData = [
      { id: 1, Main_Genre_id: 1, name: 'サブジャンル１' },
      { id: 2, Main_Genre_id: 2, name: 'サブジャンル２' },
      { id: 3, Main_Genre_id: 3, name: 'サブジャンル３' },
      { id: 4, Main_Genre_id: 1, name: 'サブジャンル４' },
      { id: 5, Main_Genre_id: 2, name: 'サブジャンル５' },
      { id: 6, Main_Genre_id: 3, name: 'サブジャンル６' },
      { id: 7, Main_Genre_id: 4, name: 'サブジャンル７' },
      { id: 8, Main_Genre_id: 4, name: 'サブジャンル８' },
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

