import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Title.css'; // CSSファイルをインポート
import title from './img/title.png'
const Title = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // エラー状態を管理
  const host = process.env.REACT_APP_HOST;
  const port = process.env.REACT_APP_PORT;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${host}:${port}/api/genres`);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        // データのグループ化
        const updatedData = Object.entries(result).flatMap(([main_name, subGenres]) =>
          subGenres.map(subGenre => ({
            ...subGenre,
            main_name,
            main_genre_id: subGenre.main_genres_id, // フィールド名を正しく変更
          }))
        );
        
        setData(updatedData);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    };
    
    fetchData();
  }, [host,port]);

  // エラーがある場合の表示
  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  // データが取得できていない場合の表示
  if (data.length === 0) {
    return <div className="container">Loading...</div>;
  }

  // main_genre_id ごとにデータをグループ化する
  const groupedData = {};
  data.forEach((item) => {
    if (!groupedData[item.main_name]) { // main_genre_id の代わりに main_name を使用
      groupedData[item.main_name] = [];
    }
    groupedData[item.main_name].push(item);
  });

  return (
    <div className="container">
      <h1><img src={title} alt="Simple_Thread" width="200"height="200"/></h1>
      
      <div className="grid-container">
        {Object.keys(groupedData).map((main_name) => (
          <div key={main_name} className="grid-item">
            <h2>{main_name}</h2>
            <table>
              <tbody>
                {groupedData[main_name].map((thread) => (
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
