import { SyntheticEvent } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  Container,
  Flex,
  Icon,
  Grid,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { DiReact, DiNodejs, DiJavascript, DiGit } from "react-icons/di";
import Layout from "components/Layout";
import { useReducedMotion } from "framer-motion";
import { MotionBox } from "components/MotionBox";

const SKILLS = [
  {
    icon: DiJavascript,
    label: "JavaScript",
    hover: "yellow.500",
  },
  {
    icon: DiReact,
    label: "React",
    hover: "blue.400",
  },
  {
    icon: DiNodejs,
    label: "Node",
    hover: "green.500",
  },
  {
    icon: DiGit,
    label: "GIT",
    hover: "orange.400",
  },
];

const Home: NextPage = () => {
  const ReduceMotion = useReducedMotion();
  const router = useRouter();
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
  const redirect = (event: SyntheticEvent) => {
    const anchor = event.currentTarget.children[0] as HTMLAnchorElement;
    router.push(anchor.href);
  };

  const variants = {
    initial: { opacity: 0, y: ReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Layout>
      <Container maxW={"6xl"}>
        <MotionBox
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pt={"16"}
          initial="initial"
          animate="visible"
          variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <MotionBox
            variants={variants}
            as={Heading}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            py={"8"}
            bgGradient="linear(to-r, red.300, blue.400, yellow.500)"
            bgClip="text"
          >
            MetaSkill{" "}
          </MotionBox>
          <MotionBox as={Text} color={"gray.300"} variants={variants}>
            Take your knowledge to another level, complete the challenges that
            will help you overcome your path as a developer. All freely
            available to the public. Lets get started!{" "}
          </MotionBox>
        </MotionBox>
        <Flex direction={isNotSmallerScreen ? "row" : "column"}>
          <Box alignSelf="center" py="12">
            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }}
              gap={6}
              mt={8}
              px={{ lg: "40px" }}
            >
              {SKILLS.map((skill, i) => {
                const isLast = i === SKILLS.length - 1;

                return (
                  <Link
                    href={`/training/${skill.label.toLowerCase()}`}
                    key={skill.label}
                  >
                    <MotionBox
                      as={Flex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      borderBottomColor="gray.400"
                      rounded="xl"
                      direction="column"
                      mt={4}
                      bg={"gray.800"}
                      hover
                      h="40vh"
                      w="32vh"
                      _hover={{ bg: skill.hover }}
                      justify="flex-end"
                      style={{ cursor: "pointer" }}
                    >
                      <Icon color="white" p="4" as={skill.icon} w="24" h="24" />
                      <Text
                        color="white"
                        p="4"
                        fontSize="xl"
                        fontWeight="semibold"
                      >
                        {skill.label}
                      </Text>
                    </MotionBox>
                  </Link>
                );
              })}
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Home;
