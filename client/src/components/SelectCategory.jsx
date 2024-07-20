import { color, Select, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const SelectCategory = ({
  selectedCategory,
  handleCategoryChange,
  categories,
}) => {
  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const bgColor = useColorModeValue("#3182CE", "#78adcf");

  return (
    <Select
      value={selectedCategory}
      onChange={handleCategoryChange}
      width={270}
      backgroundColor={bgColor}
      color={textColor}
      borderWidth={2}
    >
      <option hidden>Select Category</option>
      <option value="none">None</option>
      {categories.map((category) => (
        <option key={category._id} value={category.category}>
          {category.category}
        </option>
      ))}
    </Select>
  );
};

export default SelectCategory;
