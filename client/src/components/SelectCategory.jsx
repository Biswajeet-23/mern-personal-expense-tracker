import { color, Select } from "@chakra-ui/react";
import React from "react";

const SelectCategory = ({
  selectedCategory,
  handleCategoryChange,
  categories,
}) => {
  return (
    <Select
      value={selectedCategory}
      onChange={handleCategoryChange}
      width={270}
      borderColor="#dedcdc"
      backgroundColor="#2D3748"
      color={"white"}
      borderWidth={2}
    >
      <option hidden>Select Category</option>
      {categories.map((category) => (
        <option key={category._id} value={category.category}>
          {category.category}
        </option>
      ))}
    </Select>
  );
};

export default SelectCategory;
