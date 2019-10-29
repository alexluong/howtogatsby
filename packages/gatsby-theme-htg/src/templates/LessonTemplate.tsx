import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Heading } from "@chakra-ui/core";
import Layout from "../components/Layout";
import Container from "../components/Container";

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
    <Layout>
      <Container mt="100px" py={16}>
        <Heading as="h1" size="2xl" mb={8}>
          Lesson: {lesson.title}
        </Heading>
        <MDXRenderer>{lesson.body}</MDXRenderer>
      </Container>
    </Layout>
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
