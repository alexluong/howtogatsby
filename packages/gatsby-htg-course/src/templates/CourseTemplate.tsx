import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Heading } from "@chakra-ui/core";

interface CourseTemplateProps {
  data: {
    course: {
      body: string;
      title: string;
      slug: string;
    };
  };
}

const CourseTemplate: React.FC<CourseTemplateProps> = ({
  data: { course },
}) => {
  return (
    <Box p={8}>
      <Heading as="h1">Course: {course.title}</Heading>
      <MDXRenderer>{course.body}</MDXRenderer>
    </Box>
  );
};

export default CourseTemplate;

export const query = graphql`
  query CourseQuery($slug: String!) {
    course(slug: { eq: $slug }) {
      body
      title
      slug
    }
  }
`;
