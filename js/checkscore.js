export const checkScore = (answers, lifes) => {
  let scores = 0;
  if (answers.length < 10) {
    return -1;
  }
  answers.forEach((element) => {
    if (element.correct === true) {
      scores += 100;
      if (element.time < 10) {
        scores += 50;
      }
    }
    if (element.time > 20) {
      scores -= 50;
    }
  });
  scores += lifes * 50;
  return scores;
};
