import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Title.css'; // CSSファイルをインポート

const Title = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // エラー状態を管理

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/genres/', {
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
    
        // レスポンスから取得したデータを加工するなどの処理
        const updatedData = Object.keys(result).map(mainGenre => ({
          mainGenre,
          threads: result[mainGenre]
        }));
    
        setData(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };
    
    

    fetchData();
  }, []);

  // エラーがある場合の表示
  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  // データが取得できていない場合の表示
  if (data.length === 0) {
    return <div className="container">Loading...</div>;
  }

  // データがある場合の表示
  const groupedData = {};
  data.forEach((item) => {
    if (!groupedData[item.Main_Genre_id]) {
      groupedData[item.Main_Genre_id] = [];
    }
    groupedData[item.Main_Genre_id].push(item);
  });

  return (
    <div className="container">
      <h1>Simple_Thread</h1>
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
