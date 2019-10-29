import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import MDXProvider from "./src/components/MDXProvider";
import CSS from "./src/components/CSS";
import theme from "./src/utils/theme";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <CSS /> {/* CSS needs to be after CSSReset to override it */}
    <MDXProvider>{element}</MDXProvider>
  </ThemeProvider>
);
