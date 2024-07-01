import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SubGenre = () => {
  const { id } = useParams(); // URLパラメータからidを取得

  const [subGenreName, setSubGenreName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // サブジャンル名を取得
        const subGenreResponse = await fetch(`http://localhost:3000/api/subgenre/${id}`);
        const subGenreData = await subGenreResponse.json();
        if (subGenreData.length > 0) {
          setSubGenreName(subGenreData[0].name);
        }

        // スレッドデータを取得
        const threadResponse = await fetch(`http://localhost:3000/api/threads/${id}`);
        const threadData = await threadResponse.json();
        setData(threadData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <h1>{subGenreName}</h1>
      <button>(<Link to={`/NewThread/${id}`}>新規スレッド</Link>)</button>
      <table>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td><Link to={`/Thread/${item.id}`}>{item.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubGenre;
