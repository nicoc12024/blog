import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useWriteForm } from "../../pages/Write/useWriteForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface PublishBoxProps {
  state: {
    id?: number;
  } | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isSubmitDisabled: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  file: File | null;
}

export const PublishBox: React.FC<PublishBoxProps> = ({
  file,
  state,
  setFile,
  isSubmitDisabled,
  handleSubmit,
}) => {
  const { handleDelete } = useWriteForm();

  const handlePublishClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    confirmAlert({
      title: "Confirm to Publish",
      message: "Are you sure you want to publish?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleSubmit(e),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleDeletePost = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(state?.id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="item">
      <h2>Publish</h2>
      <span>
        <b>Status: </b> {state && state.id ? "Updating" : "Creating"}
      </span>
      <span>
        <b>Visibility: </b> Public
      </span>
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <label className="file" htmlFor="file">
        {file ? (
          <>
            {state && state.id ? "Change Image" : "Upload Image"} <AiOutlineCheck />
          </>
        ) : state && state.id ? (
          "Change Image"
        ) : (
          "Upload Image"
        )}
      </label>
      <div className="buttons">
        {state && state.id && <button onClick={handleDeletePost}>Delete</button>}
        <button disabled={isSubmitDisabled} onClick={handlePublishClick}>
          Publish
        </button>
      </div>
    </div>
  );
};
