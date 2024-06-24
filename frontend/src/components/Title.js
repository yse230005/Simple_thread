import { Link } from "react-router-dom";

const Title = () => {
  return (
    <>
      <h1>Simple_Threads</h1>
      <div>
        <p>メインジャンル</p>
        <Link to={`/SubGenre/`}>サブジャンル</Link>
      </div>
    </>
  );
};

export default Title;