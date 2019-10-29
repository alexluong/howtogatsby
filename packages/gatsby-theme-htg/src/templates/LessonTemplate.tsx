import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Heading } from "@chakra-ui/core";

interface LessonTemplateProps {
  data: {
    lesson: {
      body: string;
      title: string;
      slug: string;
    };
  };
}

const LessonTemplate: React.FC<LessonTemplateProps> = ({
  data: { lesson },
}) => {
  return (
    <Box p={8}>
      <Heading as="h1">Lesson: {lesson.title}</Heading>
      <MDXRenderer>{lesson.body}</MDXRenderer>
    </Box>
  );
};

export default LessonTemplate;

export const query = graphql`
  query LessonQuery($slug: String!) {
    lesson(slug: { eq: $slug }) {
      body
      title
      slug
    }
  }
`;
