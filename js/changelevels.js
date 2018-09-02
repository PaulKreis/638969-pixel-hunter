export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 2,
  time: 0
});

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    return game;
  }

  if (level < 0) {
    return game;
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};
