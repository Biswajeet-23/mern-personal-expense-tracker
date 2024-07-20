import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Expenses from "../components/Expenses";
import SideBar from "../components/SideBar";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();

  const sidebarBg = useColorModeValue("#f0f0f3", "#1e1e1e");
  const mainBg = useColorModeValue("#f0f0f3", "#1e1e1e");
  const textColor = useColorModeValue("#2d2d2d", "#f5f5f5");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#0d0d0d");
  const bgColor = useColorModeValue("#e0e0e0", "#1a1a1a");

  const neumorphismStyle = {
    backgroundColor: bgColor,
    borderRadius: "15px",
    borderWidth: "2px",
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
  };

  return (
    <Grid
      templateAreas={`
        "aside main"
      `}
      gridTemplateColumns={"200px 1fr"}
      gridTemplateRows={"1fr"}
      gap="4"
      height={"90vh"}
      color={textColor}
      fontWeight="bold"
      mt={2}
    >
      <GridItem style={neumorphismStyle} ml={2} bg={sidebarBg} area={"aside"}>
        <SideBar />
      </GridItem>
      <GridItem
        style={neumorphismStyle}
        pl="2"
        area={"main"}
        borderRadius="15px"
        boxShadow={`8px 8px 16px ${shadowDark}, -8px -8px 16px ${shadowLight}`}
      >
        {pathname === "/" ? <Expenses /> : <Outlet />}
      </GridItem>
    </Grid>
  );
};

export default Home;
