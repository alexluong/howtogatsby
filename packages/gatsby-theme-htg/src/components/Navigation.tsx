import React from "react";
import { Link } from "gatsby";
import { Box, Heading, Stack, Button } from "@chakra-ui/core";
import Container from "./Container";
import { COLORS } from "../utils/constants";

const NavigationLink: React.FC<{ to: string }> = ({ to, children }) => {
  return (
    <Button
      as={Link}
      variant="ghost"
      variantColor={COLORS.primary}
      px={2}
      ml={2}
      {...{ to }}
    >
      {children}
    </Button>
  );
};

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onScroll() {
    if (typeof window !== "undefined") {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  }

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex={999}
      bg="white"
      transition="all 0.3s ease"
      color="gray.100"
      boxShadow={scrolled ? "1px 2px 18px" : "none"}
      py={scrolled ? 3 : 8}
    >
      <Container d="flex" justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Heading as="h1" size="md" color="gray.800">
            HowToGatsby
          </Heading>
        </Link>

        <Stack isInline>
          <NavigationLink to="/">Courses</NavigationLink>
          <NavigationLink to="/">Recipes</NavigationLink>
          <NavigationLink to="/">Articles</NavigationLink>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navigation;
