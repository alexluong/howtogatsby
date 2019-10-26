import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Heading } from "@chakra-ui/core";

interface LessonTemplateProps {
  data: {
    lesson: {
      id: string;
      body: string;
      frontmatter: {
        title: string;
        slug: string;
      };
    };
  };
}

const LessonTemplate: React.FC<LessonTemplateProps> = ({
  data: { lesson },
}) => {
  return (
    <Box p={8}>
      <Heading as="h1">{lesson.frontmatter.title}</Heading>
      <MDXRenderer>{lesson.body}</MDXRenderer>
    </Box>
  );
};

export default LessonTemplate;

export const query = graphql`
  query LessonQuery($slug: String!) {
    lesson: mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        slug
      }
    }
  }
`;
