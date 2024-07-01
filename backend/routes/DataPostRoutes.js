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

// スレッド作成
router.post('/threads/create', async (req, res) => {
    const reqbody = req.body;
    const id = reqbody.id;
    const name = reqbody.name;

    try {
        await pool.query('INSERT INTO threads(name, sub_genres_id) VALUES(?, ?)', [name, id]);
        res.status(200).send('Success');
    } catch (error) {
        res.status(500).send('Error');
    }
});

// コメント追加
router.post('/threads/comments/add', async (req, res) => {
    const reqbody = req.body;
    const id = reqbody.id;
    const text = reqbody.text;

    let connection;
    try {
        // トランザクションを開始
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [insertResult, _] = await connection.query('INSERT INTO comments(text) VALUES(?)', [text]);
        const lastInsertedId = insertResult.insertId;
        console.log(lastInsertedId);
        await connection.query('INSERT INTO threads_comments(threads_id, comments_id) VALUES(?, ?)', [id, lastInsertedId]);
        
        // コミット
        await connection.commit();
        connection.release();

        res.status(200).send('Success');
    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        res.status(500).send('Error');
    }
});

module.exports = router;