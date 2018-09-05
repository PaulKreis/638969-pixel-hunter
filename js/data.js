export const greetingData = {
  title: `Лучшие художники-фотореалисты бросают тебе вызов!`,
  challengetext: `Правила игры просты:`,
  rules: [`Нужно отличить рисунок от фотографии и сделать выбор.`,
    `Задача кажется тривиальной, но не думай, что все так просто.`,
    `Фотореализм обманчив и коварен.`,
    `Помни, главное — смотреть очень внимательно.`]
};

export const rulesData = {
  title: `Правила`,
  rules: [`Угадай 10 раз для каждого изображения фото
  <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
  <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>`,
  `Фотографиями или рисунками могут быть оба изображения.`,
  `На каждую попытку отводится 30 секунд.`,
  `Ошибиться можно не более 3 раз.`]
};

export const questions = [{
  type: `two_from_three`,
  option1: {
    src: `http://placehold.it/468x458`,
    width: `468`,
    height: `458`,
    alt: `Option 1`
  },
  option2: {
    src: `http://placehold.it/468x458`,
    width: `468`,
    height: `458`,
    alt: `Option 2`
  }
}, {
  type: `one_from_three`,
  option1: {
    src: `http://placehold.it/304x455`,
    width: `304`,
    height: `455`,
    alt: `Option 1`
  }}, {
  type: `three_from_three`,
  option1: {
    src: `http://placehold.it/304x455`,
    width: `304`,
    height: `455`,
    alt: `Option 2`
  },
  option2: {
    src: `http://placehold.it/304x455`,
    width: `304`,
    height: `455`,
    alt: `Option 3`
  }
}];
