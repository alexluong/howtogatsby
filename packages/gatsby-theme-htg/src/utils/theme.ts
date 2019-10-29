import deepMerge from "deepmerge";
import { theme as chakraTheme } from "@chakra-ui/core";

const theme = deepMerge(chakraTheme, {
  lineHeights: {
    normal: "normal",
    shorter: "1.25",
    short: "1.5",
    base: "1.75",
    tall: "2",
    taller: "2.25",
  },
});

export default theme;
