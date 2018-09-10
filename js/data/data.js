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
//  Вопрос 1
  type: `one_from_three`,
  option1: {
    src: `https://k42.kn3.net/CF42609C8.jpg`,
    width: `600`,
    height: `831`,
    alt: `option1`,
    value: `paint`
  }
},
//  Вопрос 2
{
  type: `two_from_three`,
  option1: {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    width: `468`,
    height: `354`,
    alt: `option1`,
    value: `paint`
  },
  option2: {
    src: `https://k32.kn3.net/5C7060EC5.jpg`,
    width: `1200`,
    height: `900`,
    alt: `option2`,
    value: `photo`
  }
},
//  Вопрос 3
{
  type: `three_from_three`,
  correct: `paint`,
  option1: {
    src: `https://i.imgur.com/DiHM5Zb.jpg`,
    width: `1264`,
    height: `1864`,
    alt: `photo`
  },
  option2: {
    src: `https://k32.kn3.net/5C7060EC5.jpg`,
    width: `1200`,
    height: `900`,
    alt: `photo`
  },
  option3: {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    width: `468`,
    height: `354`,
    alt: `paint`
  }
},
//  Вопрос 4
{
  type: `two_from_three`,
  option1: {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    width: `468`,
    height: `354`,
    alt: `option1`,
    value: `photo`
  },
  option2: {
    src: `https://k32.kn3.net/5C7060EC5.jpg`,
    width: `1200`,
    height: `900`,
    alt: `option2`,
    value: `paint`
  }
},
//  Вопрос 5
{
  type: `three_from_three`,
  correct: `paint`,
  option1: {
    src: `https://k32.kn3.net/5C7060EC5.jpg`,
    width: `1200`,
    height: `900`,
    alt: `paint`
  },
  option2: {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    width: `468`,
    height: `354`,
    alt: `photo`
  },
  option3: {
    src: `https://i.imgur.com/DiHM5Zb.jpg`,
    width: `1264`,
    height: `1864`,
    alt: `photo`
  }
}, {
  //  Вопрос 6
  type: `one_from_three`,
  option1: {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    width: `468`,
    height: `354`,
    alt: `option1`,
    value: `paint`
  }
},
//  Вопрос 7
{
  type: `two_from_three`,
  option1: {
    src: `http://i.imgur.com/DKR1HtB.jpg`,
    width: `1120`,
    height: `2965`,
    alt: `option1`,
    value: `photo`
  },
  option2: {
    src: `https://k32.kn3.net/5C7060EC5.jpg`,
    width: `1200`,
    height: `900`,
    alt: `option2`,
    value: `paint`
  }
},
//  Вопрос 8
{
  type: `three_from_three`,
  correct: `paint`,
  option1: {
    src: `https://k42.kn3.net/CF42609C8.jpg`,
    width: `600`,
    height: `831`,
    alt: `option2`,
    value: `paint`
  },
  option2: {
    src: `http://i.imgur.com/1KegWPz.jpg`,
    width: `1080`,
    height: `720`,
    alt: `option3`,
    value: `photo`
  },
  option3: {
    src: `http://i.imgur.com/DKR1HtB.jpg`,
    width: `1120`,
    height: `2965`,
    alt: `option3`,
    value: `paint`
  }
},
{
  //  Вопрос 9
  type: `one_from_three`,
  option1: {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    width: `468`,
    height: `354`,
    alt: `option1`,
    value: `paint`
  }
},
//  Вопрос 10
{
  type: `two_from_three`,
  option1: {
    src: `https://i.imgur.com/DiHM5Zb.jpg`,
    width: `1264`,
    height: `1864`,
    alt: `option1`,
    value: `photo`
  },
  option2: {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    width: `468`,
    height: `354`,
    alt: `option2`,
    value: `paint`
  }
},
];
