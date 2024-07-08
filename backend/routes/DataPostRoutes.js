const express = require('express');
const mysql2 = require('mysql2/promise');
const { body, validationResult } = require('express-validator');

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
router.post('/threads/create', 
    [
        body('id').trim().notEmpty().isInt().withMessage('IDは整数でなければなりません。'),
        body('name').trim().notEmpty().isString().isLength({ max: 255 }).withMessage('名前は255文字以下でなければなりません。'),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const reqbody = req.body;
        const id = reqbody.id;
        const name = reqbody.name;
        try {
            await pool.query('INSERT INTO threads(name, sub_genres_id) VALUES(?, ?)', [name, id]);
            res.status(200).send('Success');
        } catch (error) {
            console.error('Database insertion error:', error);
            res.status(500).send('Error');
        }
});

// コメント追加
router.post('/threads/comments/add', 
    [
        body('id').trim().notEmpty().isInt(),
        body('text').trim().notEmpty().isString().isLength({ max: 500 }),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send('InvalidValue');
        }

        const reqbody = req.body;
        const id = reqbody.id;
        const text = reqbody.text;
        
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const [insertResult, _] = await connection.query('INSERT INTO comments(text) VALUES(?)', [text]);
            const lastInsertedId = insertResult.insertId;
            await connection.query('INSERT INTO threads_comments(threads_id, comments_id) VALUES(?, ?)', [id, lastInsertedId]);
            
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
