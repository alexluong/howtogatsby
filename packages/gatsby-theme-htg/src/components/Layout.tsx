import React from "react";
import { Flex } from "@chakra-ui/core";
import Navigation from "./Navigation";

const Layout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" h="100%" overflowX="hiddren">
      <Navigation />
      {children}
    </Flex>
  );
};

export default Layout;
