import React from "react";

interface SingleCatProps {
  singleCat: {
    id: number;
    name: string;
    value: string;
  };
  cat: string;
  setCat: React.Dispatch<React.SetStateAction<string>>;
}

export const SingleCat: React.FC<SingleCatProps> = ({ singleCat, cat, setCat }) => {
  return (
    <div className="cat">
      <input
        type="radio"
        checked={cat === singleCat.value}
        name="cat"
        onChange={(e) => setCat(e.target.value)}
        value={singleCat.value}
        id={singleCat.value}
        disabled={singleCat.value === "other"}
      />
      <label htmlFor={singleCat.value}>{singleCat.name}</label>
    </div>
  );
};

export default SingleCat;
