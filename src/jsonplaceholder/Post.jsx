import { useParams } from "react-router-dom";
import useRequestData from "../hooks/useRequestData";
import { useEffect } from "react";
import Loader from "../components/Loader";

const Post = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const { postID } = useParams();

  useEffect(() => {
    //Hent post med ID send med som params ELLER || post med ID 1, hvis ikke params er der
    makeRequest("https://jsonplaceholder.typicode.com/posts/" + (postID || 1));
  }, []);

  return (
    <div>

      <h1>JSONPlaceholder - Udvalgt Post</h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}
      <h2>{postID}</h2>

      {data && (
        <div className="card" key={data.id}>
          <h2> {data.title}</h2>
          <p>{data.body}</p>
          <p>{data.id}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
