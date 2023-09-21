import { Link } from "react-router-dom";
import moment from "moment";

type Post = {
  id: number;
  title: string;
  desc: string;
  img?: string;
  date: string;
  username: string;
  cat?: string;
};

const IndividualPost = ({ post }: { post: Post }) => {
  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="post">
      <div className="img">
        <Link className="link" to={`/post/${post.id}`}>
          <img src={`../upload/${post.img}`} alt="" />
        </Link>
      </div>
      <div className="content">
        <div className="titleAndDate">
          <Link className="link" to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p>
              Posted by <span>{post?.username}</span> {moment(post?.date).fromNow()}
            </p>
            <span>#{post?.cat}</span>
          </Link>
        </div>
        <p>{getText(post.desc)?.split(" ").slice(0, 70).join(" ")}...</p>
        <Link className="link" to={`/post/${post.id}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default IndividualPost;
