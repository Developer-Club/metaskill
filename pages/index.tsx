import { SyntheticEvent } from "react";
import { Heading, List, ListItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "components/Layout";

const SKILLS = ["JavaScript", "React", "Node", "GIT"];

const Home: NextPage = () => {
  const router = useRouter();

  const redirect = (event: SyntheticEvent) => {
    const anchor = event.currentTarget.children[0] as HTMLAnchorElement;
    router.push(anchor.href);
  };

  return (
    <Layout>
      <Heading mb="4">MetaSkill</Heading>
      <List bg="gray.800">
        {SKILLS.map((skill, i) => {
          const isLast = i === SKILLS.length - 1;
          const borderWidth = isLast ? "" : "1px";

          return (
            <ListItem
              key={skill}
              onClick={redirect}
              borderBottomWidth={borderWidth}
              borderBottomColor="gray.400"
              cursor="pointer"
              _hover={{ bg: "gray.500" }}
              p="4"
            >
              <Link href={`/training/${skill.toLowerCase()}`}>
                <a>{skill}</a>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Layout>
  );
};

export default Home;
