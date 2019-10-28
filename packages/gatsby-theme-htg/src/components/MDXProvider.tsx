import React from "react";
import { css } from "@emotion/core";
import { MDXProvider } from "@mdx-js/react";
import {
  Box,
  Heading,
  Text,
  Link,
  Code,
  Image,
  List,
  ListItem,
} from "@chakra-ui/core";

const DISTANCE = 8;

const headingSizes = {
  h1: "2xl",
  h2: "xl",
  h3: "lg",
  h4: "md",
  h5: "sm",
  h6: "xs",
};

const heading = (tag: string) => (props: any) => (
  <Heading as={tag} size={headingSizes[tag]} pt={4} mb={DISTANCE} {...props} />
);

const components = {
  h1: heading("h1"),
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  h5: heading("h5"),
  h6: heading("h6"),
  p: (props: any) => <Text mb={DISTANCE} {...props} />,
  a: (props: any) => <Link {...props} />,
  ul: (props: any) => (
    <List
      as="ul"
      mb={DISTANCE}
      pl="30px"
      css={css({
        "& > li::before": {
          content: "''",
          top: "9px",
          width: "6px",
          height: "6px",
          borderRadius: "100%",
          backgroundColor: "#000",
        },
      })}
      {...props}
    />
  ),
  ol: (props: any) => (
    <List
      as="ol"
      mb={DISTANCE}
      pl="30px"
      css={css({
        counterReset: "list 0",
        "& > li::before": { content: "counter(list) '.'" },
      })}
      {...props}
    />
  ),
  li: (props: any) => (
    <ListItem
      mb={3}
      position="relative"
      _before={{
        left: "-30px",
        position: "absolute",
        display: "inline-block",
        counterIncrement: "list",
        fontWeight: 600,
      }}
      {...props}
    />
  ),
  hr: (props: any) => (
    <Box as="hr" mt={DISTANCE + 4} mb={DISTANCE} {...props} />
  ),
  img: (props: any) => <Image mb={DISTANCE} {...props} />,
  pre: (props: any) => <Box as="pre" mb={DISTANCE} {...props} />,
  code: (props: any) => <Code {...props} />,
  inlineCode: (props: any) => <Code {...props} />,
};

const MyMDXProvider: React.FC = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MyMDXProvider;
