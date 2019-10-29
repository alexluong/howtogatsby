import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";
import { MAX_WIDTH } from "../utils/constants";

const Container: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box maxW={MAX_WIDTH} w="100%" mx="auto" {...props}>
      {children}
    </Box>
  );
};

export default Container;
