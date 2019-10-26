import React from "react";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    {element}
  </ThemeProvider>
);
