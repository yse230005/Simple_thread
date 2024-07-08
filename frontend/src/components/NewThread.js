import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/NewThread.css';

function NewThread() {
  const { subGenre_id } = useParams();
  const [threadTitle, setThreadTitle] = useState('');

  const handleCreateThread = async () => {
    if (threadTitle.trim() === '') {
      alert('スレッドタイトルを入力してください。');
      return;
    }

    const newThread = {
      name: threadTitle,
      id: subGenre_id,
    };

    try {
      const response = await fetch('http://localhost:3001/api/threads/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newThread),
      });

      if (response.ok) {
        alert('スレッドが作成されました。');
        // リダイレクトのためにuseNavigateを使う
        // history.push(`/SubGenre/${subGenre_id}`);
        window.location.href=`/SubGenre/${subGenre_id}`;
      } else {
        alert('スレッドの作成に失敗しました。');
      }
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('スレッドの作成中にエラーが発生しました。');
    }
  };

  return (
    <div className="center">
      <h2>NewThread</h2>
      
      <input
        className="child"
        type="text"
        placeholder="スレッドタイトル"
        value={threadTitle}
        onChange={(e) => setThreadTitle(e.target.value)}
      />
      <p></p>
      <button onClick={handleCreateThread}>スレッドを作成</button>
    </div>
  );
}

export default NewThread;
