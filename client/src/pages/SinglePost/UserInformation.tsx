import { Link } from "react-router-dom";
import moment from "moment";
import Delete from "../../img/delete.png";
import Edit from "../../img/edit.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

type Post = {
  id: number;
  title: string;
  desc: string;
  img?: string;
  username: string;
  date: string;
  userImg?: string;
  cat?: string | undefined;
};

type User = {
  id: number;
  username: string;
  email: string;
};

interface Props {
  post: Post | null;
  currentUser: User | null | undefined;
  handleDelete: (id: number) => void;
  postId: number;
}
const UserInformation: React.FC<Props> = ({
  post,
  currentUser,
  handleDelete,
  postId,
}) => {
  const handleDeletePost = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(postId),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="user">
      <div className="info">
        <p>
          Posted by <span>{post?.username}</span> {moment(post?.date).fromNow()}
        </p>
        <span>#{post?.cat}</span>
      </div>
      {currentUser?.username === post?.username && (
        <div className="edit">
          <Link to={`/write?edit=${postId}`} state={post}>
            <img src={Edit} alt="" />
          </Link>
          <img src={Delete} alt="" onClick={handleDeletePost} />
        </div>
      )}
    </div>
  );
};

export default UserInformation;
