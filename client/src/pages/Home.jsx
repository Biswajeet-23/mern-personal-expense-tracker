import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Expenses from "../components/Expenses";

const Home = () => {
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
        Aside Menu
      </GridItem>
      <GridItem pl="2" bg="white" area={"main"}>
        <Expenses />
      </GridItem>
    </Grid>
  );
};

export default Home;
