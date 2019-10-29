import React from "react";
import { Global, css } from "@emotion/core";

const CSS: React.FC = () => {
  return (
    <Global
      styles={css`
        html {
          line-height: 1.75;
        }
      `}
    />
  );
};

export default CSS;
