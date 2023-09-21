import { AsidePosts } from "../../components/AsidePosts";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";
import { useWriteForm } from "../Write/useWriteForm";
import UserInformation from "./UserInformation";
import { useFetchPost } from "./useFetchPost";

export const SinglePost = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = authContext || {};

  const post = useFetchPost(postId);

  const { handleDelete } = useWriteForm();

  return (
    <div className="single">
      <div className="content">
        <h1>{post?.title}</h1>
        <UserInformation
          post={post}
          currentUser={currentUser}
          handleDelete={handleDelete}
          postId={parseInt(postId)}
        />
        <img src={`../upload/${post?.img}`} alt="" />
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.desc ?? ""),
          }}
        ></p>
      </div>
      
      <AsidePosts cat={post?.cat} currentPostId={parseInt(postId)} />
    </div>
  );
};

export default SinglePost;
