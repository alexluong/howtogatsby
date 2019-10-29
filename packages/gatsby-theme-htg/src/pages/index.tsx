import React from "react";
import { Button } from "@chakra-ui/core";
import Layout from "../components/Layout";
import Container from "../components/Container";

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <Container py={48}>
        <Button variantColor="purple">Hello</Button>
      </Container>
    </Layout>
  );
};

export default IndexPage;
