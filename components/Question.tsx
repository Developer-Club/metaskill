import { FC } from "react";
import {
  Text,
  Stack,
  Flex,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

type Option = {
  text: string;
  correct: boolean;
};

type Question = {
  text: string;
  options: Option[];
};

type QuestionProps = {
  question: Question;
};

function isMultiple(options: Option[]) {
  let count = 0;

  for (let i = 0; i < options.length; i++) {
    if (options[i].correct) count++;
  }

  return count > 1;
}

const Question: FC<QuestionProps> = ({ question }) => {
  const { text, options } = question;

  const isMultipleSelection = isMultiple(options);

  return (
    <div>
      <Text mb="4">{text}</Text>
      {isMultipleSelection && (
        <Stack spacing="5">
          {options.map((option, i) => (
            <Checkbox
              key={option.text}
              name={`option.${i}`}
              value={option.text}
              cursor="pointer"
            >
              {option.text}
            </Checkbox>
          ))}
        </Stack>
      )}
      {!isMultipleSelection && (
        <RadioGroup name="option">
          <Stack spacing="5">
            {options.map((option) => (
              <Radio key={option.text} value={option.text} cursor="pointer">
                {option.text}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      )}
    </div>
  );
};

export default Question;
