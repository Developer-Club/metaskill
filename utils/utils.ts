/**
 * Funcion para calcular el porcentaje de respuestas acertadas
 */

interface IOptions {
  text: string;
  options: Array<{ text: string; correct: boolean }>;
}

export function grade(
  optionsQuestion: Record<string, boolean>[],
  answers: IOptions[]
) {
  let finalGrade = 0;
  let allQuestionsRight = true;

  console.log("user", optionsQuestion);
  console.log("answers", answers);

  if (optionsQuestion.length !== answers.length) {
    return "error";
  }

  for (let index = 0; index < optionsQuestion.length; index++) {
    const answerUser = Object.values(optionsQuestion[index]);
    const answerServer = Object.values(answers[index].options);

    for (let indexObject = 0; indexObject < answerUser.length; indexObject++) {
      if (answerUser[indexObject] !== answerServer[indexObject].correct) {
        allQuestionsRight = false;
        break;
      }
    }
    if (allQuestionsRight) {
      finalGrade++;
    }
  }

  return `${finalGrade}/${answers.length}`;
}

/**
 * Funcion para saber si la pregunta es multiple
 */
type Option = {
  text: string;
  correct: boolean;
};

export function isMultiple(options: Option[]) {
  if (options === undefined) {
    return true;
  }

  let count = 0;

  for (let i = 0; i < options.length; i++) {
    if (options[i].correct) count++;
  }

  return count > 1;
}

/**
 * Preparar el estado inicial de las preguntas
 */
export function prepareInitialState(questionsServer: Option[], isMultiple: boolean) {
  if (questionsServer === undefined) {
    return {};
  }

  const initialStateObject: Record<string, boolean> = {};

  for (let index = 0; index < questionsServer.length; index++) {
    if (!isMultiple && index === 0) {
      initialStateObject[`checkbox${index}`] = true;
      continue;
    }

    initialStateObject[`checkbox${index}`] = false;
  }

  return initialStateObject;
}