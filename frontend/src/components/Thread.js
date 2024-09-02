import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/Thread.css'; // CSSファイルをインポート

const Thread = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const host = process.env.REACT_APP_HOST;
  const port = process.env.REACT_APP_PORT;
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://${host}:${port}/api/threads/${id}/comments`);
      const result = await response.json();
      setComments(result);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id,host,port]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://${host}:${port}/api/threads/comments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, text }),
      });

      if (response.ok) {
        setText(''); // 成功したらテキストエリアをクリア
        // コメントを再取得する
        fetchComments();
        // または、ページをリロードする
        // window.location.reload();
      } else {
        console.error('Error adding comment:', await response.text());
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='container'>
      <h3>スレッド</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            投稿内容<br />
            <textarea name="text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </label>
        </p>
        <p><input type="submit" value="送信" /></p>
      </form>
      <div>
        <table>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item.id}>
                <td className='id'>{index + 1}</td> {/* 添え字の番号を表示 */}
                <td className='text'>{item.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Thread;
