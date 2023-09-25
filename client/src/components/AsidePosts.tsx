import { Link } from "react-router-dom";
import useAsidePosts from "./useAsidePosts";

type Post = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

type Props = {
  cat: string | undefined;
  currentPostId: number | null;
};

export const AsidePosts = ({ cat, currentPostId }: Props) => {
  const { filteredAndShuffledPosts, loading } = useAsidePosts(cat, currentPostId);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="menu">
      <h2>Other posts you may like</h2>
      {filteredAndShuffledPosts.length === 0 ? (
        <p>No posts found! </p>
      ) : (
        filteredAndShuffledPosts.map((post: Post) => (
          <div className="post" key={post.id}>
            <Link className="link" to={`/post/${post.id}`}>
              <img src={`../upload/${post.img}`} alt={post.title} />
              <h3>{post.title}</h3>
              <button>Read More</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
