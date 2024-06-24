import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/NewThread.css'; // CSSファイルをインポート
function NewThread() {
    return (
        <div class="center">
            <h2>NewThread</h2>
            <input class="child"
                type="text"
                placeholder="スレッドタイトル"
            />
            <p></p>
            <button>スレッドを作成</button>
        </div>
    )
}
export default NewThread