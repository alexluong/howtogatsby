import React from "react";
import { graphql, navigate } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Heading, List, ListItem, Text } from "@chakra-ui/core";
import Layout from "../components/Layout";
import Container from "../components/Container";

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
    <Layout>
      <Container py={48}>
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
      </Container>
    </Layout>
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
