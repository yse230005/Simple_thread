import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './css/NewThread.css';

function NewThread() {
    const { subGenre_id } = useParams();
    // const history = useHistory();
    const [threadTitle, setThreadTitle] = useState('');
    
    // 仮のThreadData
    const [threadData, setThreadData] = useState([
        { id: 1, sub_Genre_id: 1, name: 'サブジャンル１スレッド１' },
        { id: 2, sub_Genre_id: 1, name: 'サブジャンル１スレッド２' },
        { id: 3, sub_Genre_id: 1, name: 'サブジャンル１スレッド３' },
        { id: 4, sub_Genre_id: 3, name: 'サブジャンル３スレッド４' },
        { id: 5, sub_Genre_id: 3, name: 'サブジャンル３スレッド５' },
        { id: 6, sub_Genre_id: 3, name: 'サブジャンル３スレッド６' },
        { id: 7, sub_Genre_id: 4, name: 'サブジャンル４スレッド７' },
        { id: 8, sub_Genre_id: 4, name: 'サブジャンル４スレッド８' },
    ]);

    const handleCreateThread = () => {
        if (threadTitle.trim() === '') {
            alert('スレッドタイトルを入力してください。');
            return;
        }

        const newThread = {
            id: threadData.length + 1,
            sub_Genre_id: parseInt(subGenre_id),
            name: threadTitle,
        };

        setThreadData([...threadData, newThread]);
        // history.push(`/SubGenre/${subGenre_id}`);
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
