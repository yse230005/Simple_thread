import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Title.css'; // CSSファイルをインポート

const Title = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // エラー状態を管理

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/genres');
    
        if (!response.ok) {
          console.log("c")
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        console.log("a");
        
        setData(result);
        console.log(data);
        console.log(result);
        // レスポンスから取得したデータを加工するなどの処理
        // const updatedData = Object.keys(result).map(mainGenre => ({
        //   mainGenre,
        //   threads: result[mainGenre]
        // }));
      //   setData(updatedData);
      } catch (error) {
        console.log("b");
        setError('Error fetching data. Please try again later.');
      }
    };
    
    

    fetchData();
  }, []);

  // エラーがある場合の表示
  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  // データが取得できていない場合の表示
  if (data.length === 0) {
    return <div className="container">Loading...</div>;
  }

  // データがある場合の表示
  const groupedData = {};
  data.forEach((item) => {
    if (!groupedData[item.name]) {
      groupedData[item.name] = [];
    }
    groupedData[item.name].push(item);
  });

  return (
    <div className="container">
      <p>{data[0].mainGenre}</p>
      
      <h1>Simple_Thread</h1>
     
    </div>
  );
};

export default Title;