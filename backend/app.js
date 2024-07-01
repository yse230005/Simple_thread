const express = require('express');
const cors = require('cors');
// env
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
// CORSを設定する
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// データ取得
const DataGetRutes = require('./routes/DataGetRoutes');
app.use('/api', DataGetRutes);
// データ追加
const DataPostRutes = require('./routes/DataPostRoutes');
app.use('/api', DataPostRutes);

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});