let lifes = 3;
export const returnLifes = () => {
  lifes = 3;
  return lifes;
};
export const reduceLifes = () => {
  if (lifes > 0) {
    lifes -= 1;
  }
  return lifes;
};
