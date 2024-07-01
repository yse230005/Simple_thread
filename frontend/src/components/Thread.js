import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Thread = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/threads/${id}`);
        const result = await response.json();
        setComments(result);
      } catch (error) {
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
        {comments.map((comment, index) => (
          <p key={index}>{comment.text} ({comment.created_at})</p>
        ))}
      </div>
    </div>
  );
};

export default Thread;
