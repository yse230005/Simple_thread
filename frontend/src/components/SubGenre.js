import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SubGenre = () => {
  const { id } = useParams(); // URLパラメータからidを取得

  const [subGenreName, setSubGenreName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const ThreadData = [
      { id: 1, sub_Genre_id: 1, name: '朝ごはん' },
      { id: 2, sub_Genre_id: 1, name: '昼ごはん' },
      { id: 3, sub_Genre_id: 1, name: '夜ごはん' },
      { id: 4, sub_Genre_id: 3, name: '１２時暇な奴' },
      { id: 5, sub_Genre_id: 3, name: '好きな顔文字' },
      { id: 6, sub_Genre_id: 3, name: '(´・ω・｀)' },
      { id: 7, sub_Genre_id: 4, name: 'かか' },
      { id: 8, sub_Genre_id: 4, name: 'あ' },
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
