import { FC, Dispatch, ChangeEvent, useState, useEffect } from "react";
import {
  Text,
  Stack,
  Flex,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { isMultiple, prepareInitialState } from "../utils/utils";

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

const Question: FC<QuestionProps> = ({ question, syncChildState }) => {
  const { text, options } = question;
  const isMultipleSelection = isMultiple(options);

  const initialState = prepareInitialState(options, isMultipleSelection);             // Formato dinamico para objeto inicial 
  const [allCheckboxes, setAllCheckboxes] = useState(initialState); // Estado para sincronizar con el padre
  const [radioSelect, setRadioSelect] = useState<any>("");

  function change(checkboxKey: string, value: boolean | string) {
    if (checkboxKey === "singleAnswer") {
      setRadioSelect(value);
      const newCheckbox: Record<string, boolean> = {}

      for (const key in allCheckboxes) {
        if (key === `checkbox${value}`) {
          newCheckbox[key] = true;
          continue
        }
        newCheckbox[key] = false;
      }

      return syncChildState(newCheckbox); // data al padre
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
          defaultValue={0}
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
