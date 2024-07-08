import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/NewThread.css';

const NewThread = ()  =>{
  const { id } = useParams();
  const [threadTitle, setThreadTitle] = useState('');

  const handleCreateThread = async () => {
    if (threadTitle.trim() === '') {
      alert('スレッドタイトルを入力してください。');

    }
    console.log(id);
    console.log(threadTitle);
    const newThread = {
      id: id,
      name: threadTitle,
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
        window.location.href = `/SubGenre/${id}`;
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
