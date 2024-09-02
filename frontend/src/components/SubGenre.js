import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/SubGenre.css';
const SubGenre = () => {
  const { id } = useParams(); // URLパラメータからidを取得

  const [subGenreName, setSubGenreName] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // エラー状態を管理

  useEffect(() => {
    const fetchData = async () => {
      try {
        // サブジャンル名を取得
        const subGenreResponse = await fetch(`http://localhost:3001/api/sub_genres/${id}/threads`);
        if (!subGenreResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const subGenreData = await subGenreResponse.json();
        if (subGenreData.length > 0) {
          setSubGenreName(subGenreData[0].name);
        }

        // スレッドデータを取得
        const threadResponse = await fetch(`http://localhost:3001/api/sub_genres/${id}/threads`);
        if (!threadResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const threadData = await threadResponse.json();
        setData(threadData);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // エラーがある場合の表示
  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  // データが取得できていない場合の表示
  if (subGenreName === '' && data.length === 0) {
    return (
      <div className="container">
        <h1>Thread List</h1>
        <button>(<Link to={`/NewThread/${id}`}>新規スレッド</Link>)</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Thread List</h1>
      <button>(<Link to={`/NewThread/${id}`}>新規スレッド</Link>)</button>
      <table>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className='grid-container'>
              <td><Link to={`/Thread/${item.id}`}>{item.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubGenre;
