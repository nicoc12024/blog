import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axiosBaseUrl";
import moment from "moment";

interface PostState {
  id?: number;
  title?: string;
  desc?: string;
  cat?: string;
  img?: string;
}

export const useWriteForm = () => {
  const state: PostState = useLocation().state || {};
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(state.desc || "");
  const [title, setTitle] = useState<string>(state.title || "");
  const [file, setFile] = useState<File | null>(null);
  const [cat, setCat] = useState<string>(state.cat || "");
  const [error, setError] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState("input");

  const uploadImage = async (): Promise<string | undefined> => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    }
    return undefined;
  };

  const handleQuillChange = (newValue: string) => {
    setValue(newValue);

    const charCount = newValue.length;

    if (charCount > 9000) {
      setError("Description should be 9000 characters or less.");
    } else {
      setError("");
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.length > 70) {
      setInputBorderColor("input-title-red");
      setIsSubmitDisabled(true);
      setError("Title should be 70 characters or less.");
    } else {
      setInputBorderColor("input");
      setIsSubmitDisabled(false);
      setError("");
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate inputs
    if (state && state.id) {
      if (!title || !value || !cat || value.length > 9000) {
        console.warn(
          "All fields except image are required for updating, and the description should be 9000 characters or less."
        );
        setError(
          "All fields except image are required for updating, and the description should be 9000 characters or less."
        );
        return;
      }
    } else {
      if (!title) {
        setError("Title is required for creation.");
        return;
      }

      if (!value) {
        setError("Description is required for creation.");
        return;
      }

      if (!file) {
        setError("Image is required for creation.");
        return;
      }

      if (!cat) {
        setError("Category is required for creation.");
        return;
      }

      if (value.length > 9000) {
        setError("The description should be 9000 characters or less.");
        return;
      }
    }

    let imgUrl = null;
    if (file) {
      imgUrl = await uploadImage();
    }

    try {
      if (state && state.id) {
        const updateData: PostState = {
          title,
          desc: value,
          cat,
        };

        // Only update the img field if a new image is uploaded
        if (imgUrl) {
          updateData.img = imgUrl;
        } else if (state.img) {
          // If the post already has an image, use it
          updateData.img = state.img;
        }

        await makeRequest.put(`/posts/${state.id}`, updateData);
        navigate("/");
      } else {
        await makeRequest.post("/posts/", {
          title,
          desc: value,
          cat,
          img: imgUrl || "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      navigate("/");
    } catch (err) {
      console.error("Error during post creation/update:", err);
    }
  };

  const handleDelete = async (postId: string | number | undefined) => {
    try {
      await makeRequest.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    state,
    value,
    title,
    setFile,
    file,
    cat,
    setCat,
    error,
    isSubmitDisabled,
    inputBorderColor,
    handleChangeTitle,
    handleQuillChange,
    handleSubmit,
    handleDelete,
  };
};
