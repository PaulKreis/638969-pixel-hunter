import {assert} from 'chai';
import {reduceLifes, returnLifes} from '../utils/checklifes.js';
describe(`Score checking tests`, () => {
  describe(`Base tests`, () => {
    it(`Return 2 lifes on 1 mistake`, () => {
      let lifes = reduceLifes();
      assert.equal(lifes, 2);
    });

    it(`Return 0 lifes on 3 mistake`, () => {
      returnLifes();
      let lifes = reduceLifes();
      lifes = reduceLifes();
      lifes = reduceLifes();
      assert.equal(lifes, 0);
    });
  });
});
