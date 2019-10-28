import React from "react";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import MDXProvider from "./src/components/MDXProvider";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <MDXProvider>{element}</MDXProvider>
  </ThemeProvider>
);
