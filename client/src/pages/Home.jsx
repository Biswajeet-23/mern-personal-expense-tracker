import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Expenses from "../components/Expenses";
import SideBar from "../components/SideBar";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Dashboard from "./home_pages/Dashboard";
import Settings from "./home_pages/Settings";

const Home = () => {
  const { pathname } = useLocation();
  return (
    <Grid
      templateAreas={`
                  "aside main"`}
      gridTemplateColumns={"200px 1fr"}
      gridTemplateRows={"1fr"}
      gap="4"
      height={"90vh"}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="pink.300" area={"aside"}>
        <SideBar />
      </GridItem>
      <GridItem pl="2" bg="white" area={"main"}>
        {pathname == "/" ? <Expenses /> : <Outlet />}
      </GridItem>
    </Grid>
  );
};

export default Home;
