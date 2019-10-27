import React from "react";
import { graphql, navigate } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Heading, List, ListItem, Link, Text } from "@chakra-ui/core";

interface CourseTemplateProps {
  data: {
    course: {
      body: string;
      title: string;
      slug: string;
      lessons: {
        id: string;
        title: string;
        slug: string;
      }[];
    };
  };
}

const CourseTemplate: React.FC<CourseTemplateProps> = ({
  data: { course },
}) => {
  return (
    <Box p={8}>
      <Heading as="h1">Course: {course.title}</Heading>
      <Text>Lessons:</Text>
      <List as="ol" styleType="decimal">
        {course.lessons.map(lesson => (
          <ListItem
            key={lesson.id}
            onClick={() => navigate(`/${lesson.slug}`)}
            cursor="pointer"
          >
            {lesson.title}
          </ListItem>
        ))}
      </List>
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
      lessons {
        id
        title
        slug
      }
    }
  }
`;
