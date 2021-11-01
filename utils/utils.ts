/**
 * Funcion para calcular el porcentaje de respuestas acertadas
 */

interface IOptions {
  text: string;
  options: Array<{text:string; correct: boolean}>;
}

export function grade(optionsQuestion: Record<string, boolean>[], answers: IOptions[]) {
  let notaAcumulada = 0;
  let allQuestionsRight = true

  if (optionsQuestion.length !== answers.length) { return "error" }

  for (let index = 0; index < optionsQuestion.length; index++) {
    const answerUser = Object.values(optionsQuestion[index])
    const answerServer = Object.values(answers[index].options)

    for (let indexObject = 0; indexObject < answerUser.length; indexObject++) {
      if (answerUser[indexObject] !== answerServer[indexObject].correct) {
        allQuestionsRight = false
        break;
      }

    }
    if (allQuestionsRight) {
      notaAcumulada++;
    }
  }

  return `${notaAcumulada}/${answers.length}`
}
