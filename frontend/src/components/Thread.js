import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Thread = () => {
  const { id } = useParams();
  const [threadData, setThreadData] = useState({});
  const [comment, setComment] = useState('');

  useEffect(() => {
    // 仮のThreadData
    const ThreadData = [
      { id: 1, name: 'サブジャンル１スレッド１' },
      { id: 2, name: 'サブジャンル１スレッド２' },
      { id: 3, name: 'サブジャンル１スレッド３' },
      { id: 4, name: 'サブジャンル３スレッド４' },
      { id: 5, name: 'サブジャンル３スレッド５' },
      { id: 6, name: 'サブジャンル３スレッド６' },
      { id: 7, name: 'サブジャンル４スレッド７' },
      { id: 8, name: 'サブジャンル４スレッド８' },
    ];

    // idに一致するスレッドデータを取得
    const thread = ThreadData.find((t) => t.id.toString() === id);
    if (thread) {
      setThreadData(thread);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('コメント:', comment);
    // コメントを変数に保存する処理を追加（必要に応じて）
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>{threadData.name}</h3>
        <p>
          <label>
            投稿内容<br />
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </label>
        </p>
        <p>
          <input type="submit" value="送信" />
        </p>
      </form>
    </div>
  );
};

export default Thread;
