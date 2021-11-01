import { FC, Dispatch, ChangeEvent, useState } from "react";
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
  syncChildState: Dispatch<any>
};

function isMultiple(options: Option[]) {
  let count = 0;

  for (let i = 0; i < options.length; i++) {
    if (options[i].correct) count++;
  }

  return count > 1;
}

const Question: FC<QuestionProps> = ({ question, syncChildState }) => {
  const { text, options } = question;
  const initialState = prepareInitialState(options)[0];             // Formato dinamico para objeto inicial 
  const [allCheckboxes, setAllCheckboxes] = useState(initialState); // Estado para sincronizar con el padre
  const [radioSelect, setRadioSelect] = useState<any>("");

  const isMultipleSelection = isMultiple(options);

  function change(checkboxKey: string, value: boolean | string) {
    if (checkboxKey === "singleAnswer") {
      setRadioSelect(value);
      syncChildState({...allCheckboxes, [`checkbox${value}`]: true}); // data al padre
      return;
    }

    setAllCheckboxes({...allCheckboxes, [checkboxKey]: !value});
    syncChildState({...allCheckboxes, [checkboxKey]: !value}); // data al padre
  }

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
              checked={allCheckboxes[`checkbox${i}`]}
              onChange={() => change(`checkbox${i}`, allCheckboxes[`checkbox${i}`])}
            >
              {option.text}
            </Checkbox>
          ))}
        </Stack>
      )}
      {!isMultipleSelection && (
        <RadioGroup
          name="option"
          onChange={(newValue: string) => change("singleAnswer", newValue)}
          value={Number(radioSelect)}
        >
          <Stack spacing="5">
            {options.map((option, i) => (
              <Radio id={`${i}`} key={i} value={i} cursor="pointer">
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

function prepareInitialState(lista: { text: string; correct: boolean }[]): [Record<string, boolean>, { checkbox: string; correct: boolean }[]] {
  const initialStateObject: Record<string, boolean> = {};
  const listForRender: { checkbox: string; correct: boolean }[] = [];

  for (let index = 0; index < lista.length; index++) {
    initialStateObject[`checkbox${index}`] = false;
    listForRender.push({ checkbox: `checkbox${index}`, correct: false });
  }

  return [initialStateObject, listForRender];
}
