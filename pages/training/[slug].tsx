import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { Box, Heading, Flex, Text, Button, Spinner } from "@chakra-ui/react";

import Layout from "components/Layout";
import Question from "components/Question";

import { getJsonBySlug } from "lib/api";

// helpers
import { grade, isMultiple, prepareInitialState } from "../../utils/utils";

type Props = {
  slug: string;
  data: any[];
};

const finalGrade = [] as any;

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TrainingPage: NextPage<Props> = (props) => {
  const { slug, data } = props;
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questionsState, setQuestionsState] = useState<Record<string, any>>(prepareInitialState(data[index]?.options, isMultiple(data[index]?.options)));

  const isFinished = index === data.length;

  async function next() {
    setLoading(true);
    finalGrade.push(questionsState);
    await delay(1000);
    if (!isFinished) {
      setIndex(index + 1);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <Heading textAlign="center" textTransform="uppercase" width="100%">
        Training {slug}
      </Heading>
      <Flex minH="80vh" alignItems="center" justifyContent="center">
        {loading && <Spinner />}

        {!loading && !isFinished && (
          <Box w="80%" maxW="620px" bg="gray.900" minHeight="300px" p="5">
            <Question
              question={data[index]}
              syncChildState={setQuestionsState}
            />
          </Box>
        )}

        <Text mx="10" fontSize="9xl">
          {isFinished && ( grade(finalGrade, data) )}
        </Text>
      </Flex>

      <Flex
        position="fixed"
        bottom="0"
        left="0"
        minHeight="60px"
        bg="gray.900"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Text mx="10" fontSize="xl">
          10%
        </Text>

        {!isFinished && (
          <Flex position="absolute" right="0" mx="2">
            <Button
              onClick={next}
              bg="purple.500"
              _focus={{ bg: "purple.400" }}
              _hover={{ bg: "purple.400" }}
            >
              NEXT
            </Button>
          </Flex>
        )}
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  const json = getJsonBySlug(slug as string);
  const { data } = json;

  return {
    props: {
      slug,
      data,
    },
  };
};

export default TrainingPage;
