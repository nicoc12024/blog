import React from "react";
import { SingleCat } from "./SingleCat";

interface CategoryType {
  id: number;
  name: string;
  value: string;
}

interface CategoryBoxProps {
  cat: string;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  catArray: CategoryType[];
}

export const CategoryBox: React.FC<CategoryBoxProps> = ({ cat, setCat, catArray }) => {
  return (
    <div className="item">
      <h2>Category</h2>
      {catArray.map((singleCat) => (
        <SingleCat cat={cat} setCat={setCat} singleCat={singleCat} key={singleCat.id} />
      ))}
    </div>
  );
};
