const express = require('express');
const mysql2 = require('mysql2/promise');
// env
require('dotenv').config();

const HOST = process.env.HOST;
const pool = mysql2.createPool({
    host: HOST,
    user: 'root',
    password: '',
    database: 'simple_threads',
});
const router = express.Router();

// 全ジャンル
router.get('/genres/', async (req, res) => {
    const sql = 'SELECT main_genres.name AS main_name, sub_genres.id, sub_genres.name FROM main_genres INNER JOIN main_genres_sub_genres ON main_genres.id = main_genres_sub_genres.main_genres_id INNER JOIN sub_genres ON sub_genres.id = main_genres_sub_genres.sub_genres_id';
    try {
        const [results] = await pool.query(sql);
        // 整形
        const data = results.reduce((acc, obj) => {
            const name = obj.main_name; 
            delete obj.main_name;
            if (!acc[name]) {
              acc[name] = [];
            }
            acc[name].push(obj);
            return acc;
        }, {});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error');
    }
});

// サブジャンル 全スレッド
router.get('/sub_genres/:id/threads', async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT threads.* FROM sub_genres INNER JOIN threads ON sub_genres.id = threads.sub_genres_id WHERE sub_genres.id = ?';
    try {
        const [results] = await pool.query(sql, [id]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send('Error');
    }
});

// スレッド 全コメント
router.get('/threads/:id/comments', async (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT comments.text, comments.created_at FROM threads INNER JOIN threads_comments ON threads.id = threads_comments.threads_id INNER JOIN comments ON threads_comments.comments_id = comments.id WHERE threads.id = ?';
    try {
        const [results] = await pool.query(sql, [id]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send('Error');
    }
});

module.exports = router;