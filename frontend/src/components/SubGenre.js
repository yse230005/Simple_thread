import { Link } from "react-router-dom";

const SubGenre = () => {
  return (
    <>
      <h1>サブジャンル</h1>
      <div>
       <Link to={`/Thread/`}>スレッドタイトル</Link>
      </div>
    </>
  );
};

export default SubGenre;