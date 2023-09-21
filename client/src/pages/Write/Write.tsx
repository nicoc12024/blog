import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useWriteForm } from "./useWriteForm";
import { WriteMenu } from "../../components/write/WriteMenu";

export const Write = () => {
  const {
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
  } = useWriteForm();

  return (
    <div className="add">
      <div className="content">
        {state.id ? <h1>Edit your post</h1> : <h1>Create your post</h1>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleChangeTitle}
          className={inputBorderColor}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={handleQuillChange}
          />
        </div>
        <div className="charCount">{value.length} / 9000 characters</div>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Menu Right desktop / bottom mobile  */}
      <WriteMenu
        state={state}
        cat={cat}
        setCat={setCat}
        setFile={setFile}
        file={file}
        isSubmitDisabled={isSubmitDisabled}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
