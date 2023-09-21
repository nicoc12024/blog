import React from "react";
import { PublishBox } from "./PublishBox";
import { CategoryBox } from "./CategoryBox";

interface CatType {
  id: number;
  name: string;
  value: string;
}

interface PostState {
  id?: number;
  title?: string;
  desc?: string;
  cat?: string;
  img?: string;
}

interface WriteMenuProps {
  state: PostState | null;
  cat: string;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isSubmitDisabled: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  file: File | null;
}

const catArray: CatType[] = [
  {
    id: 0,
    name: "art",
    value: "art",
  },
  {
    id: 1,
    name: "science",
    value: "science",
  },
  {
    id: 2,
    name: "food",
    value: "food",
  },
  {
    id: 3,
    name: "other",
    value: "other",
  },
];

export const WriteMenu: React.FC<WriteMenuProps> = ({
  state,
  cat,
  setCat,
  setFile,
  file,
  isSubmitDisabled,
  handleSubmit,
}) => {
  return (
    <div className="menu">
      {/* Category Radio Buttons Box */}
      <CategoryBox cat={cat} setCat={setCat} catArray={catArray} />
      {/* Publish Box */}
      <PublishBox
        state={state}
        setFile={setFile}
        file={file}
        isSubmitDisabled={isSubmitDisabled}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
