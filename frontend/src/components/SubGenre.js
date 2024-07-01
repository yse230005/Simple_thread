import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SubGenre = () => {
  const { id } = useParams(); // URLパラメータからidを取得

  const [subGenreName, setSubGenreName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const ThreadData = [
      { id: 1, sub_Genre_id: 1, name: 'サブジャンル１スレッド１' },
      { id: 2, sub_Genre_id: 1, name: 'サブジャンル１スレッド２' },
      { id: 3, sub_Genre_id: 1, name: 'サブジャンル１スレッド３' },
      { id: 4, sub_Genre_id: 3, name: 'サブジャンル３スレッド４' },
      { id: 5, sub_Genre_id: 3, name: 'サブジャンル３スレッド５' },
      { id: 6, sub_Genre_id: 3, name: 'サブジャンル３スレッド６' },
      { id: 7, sub_Genre_id: 4, name: 'サブジャンル４スレッド７' },
      { id: 8, sub_Genre_id: 4, name: 'サブジャンル４スレッド８' },
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

    // sub_idに一致するSubGenreDataのnameを取得
    const subGenre = SubGenreData.find(item => item.Main_Genre_id.toString() === id);
    if (subGenre) {
      setSubGenreName(subGenre.name);
    }

    // ThreadDataからsub_idが一致するデータを抽出
    const filteredData = ThreadData.filter(item => item.sub_Genre_id.toString() === id);

    setData(filteredData);
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
