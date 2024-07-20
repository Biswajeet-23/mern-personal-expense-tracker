import { Select, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const SelectCategory = ({
  selectedCategory,
  handleCategoryChange,
  categories,
}) => {
  // Define color values based on color mode
  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const bgColor = useColorModeValue("#e0e0e0", "#1a1a1a");
  const borderColor = useColorModeValue("#e0e0e0", "#1f1f1f");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#0d0d0d");

  const neumorphismStyle = {
    backgroundColor: bgColor,
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
    borderRadius: "15px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <Select
      value={selectedCategory}
      onChange={handleCategoryChange}
      width={270}
      backgroundColor={bgColor}
      color={textColor}
      borderWidth={2}
      borderColor={borderColor}
      borderRadius="15px"
      boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
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
