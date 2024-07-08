import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Thread = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/sub_genres/${id}/threads`);
        const result = await response.json();
        console.log(result);
        setComments(result);
      } catch (error) {
        console.log("a")
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <div>
      <h3>スレッド</h3>
      <form action="#">
        <p><label>投稿内容<br /><textarea name="comment"></textarea></label></p>
        <p><input type="submit" value="送信" /></p>
      </form>
      <div>
      <table>
        <tbody>
          {comments.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
                <table>
                <tbody>
                  
                    <tr>
                      <td>1</td>
                      <td>分かる</td>
                    </tr>
          
                </tbody>
              </table>
    </div>
  );
};

export default Thread;
