import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Expenses from "../components/Expenses";
import SideBar from "../components/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../global_context/UserContext";

const Home = () => {
  const { pathname } = useLocation();
  const sidebarBg = useColorModeValue(
    "background.secondary",
    "background.secondaryDark"
  );
  const mainBg = useColorModeValue("background.light", "background.dark");
  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;

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
    >
      <GridItem
        pl="2"
        bg={sidebarBg}
        area={"aside"}
        borderRightWidth="3px"
        borderTopWidth="3px"
        borderBottomWidth="3px"
        borderColor={useColorModeValue(
          "borders.default",
          "borders.defaultDark"
        )}
        borderRadius="md"
      >
        <SideBar name={username} />
      </GridItem>
      <GridItem
        pl="2"
        bg={mainBg}
        area={"main"}
        borderRadius="md"
        borderWidth="3px" // Increased border width
        borderColor={useColorModeValue(
          "borders.default",
          "borders.defaultDark"
        )}
      >
        {pathname === "/" ? <Expenses /> : <Outlet />}
      </GridItem>
    </Grid>
  );
};

export default Home;
