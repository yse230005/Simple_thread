const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

// CORSを設定する
app.use(cors());

// MySQL接続の設定
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simple_threads',
});

// MySQL接続
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
});
// エンドポイント
// メイン サブ 取得
// SELECT * FROM main_genres INNER JOIN main_genres_sub_genres ON main_genres.id = main_genres_sub_genres.main_genres_id INNER JOIN sub_genres ON sub_genres.id = main_genres_sub_genres.sub_genres_id;
app.get('/api', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT sub_genres.name AS s_name, main_genres.name AS m_name FROM main_genres JOIN main_genres_sub_genres ON main_genres.id = main_genres_sub_genres.main_genres_id JOIN sub_genres ON main_genres_sub_genres.sub_genres_id = sub_genres.id';
    // MySQLクエリ実行
    connection.query(sql, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'err' });
        } else {
            res.json(results);
        }
    });
});

// スレッド内のコメント
app.get('/api/threads/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT comments.text, comments.created_at FROM threads INNER JOIN threads_comments ON threads.id = threads_comments.threads_id INNER JOIN comments ON threads_comments.comments_id = comments.id WHERE threads.id = ?';
    // MySQLクエリ実行
    connection.query(sql, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'err' });
        } else {
            res.json(results);
        }
    });
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});