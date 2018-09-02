import {assert} from 'chai';
import {reducelifes, returnlifes} from '.././checklifes.js';
describe(`Score checking tests`, () => {
  describe(`Base tests`, () => {
    it(`Return 2 lifes on 1 mistake`, () => {
      let lifes = reducelifes();
      assert.equal(lifes, 2);
    });

    it(`Return 0 lifes on 3 mistake`, () => {
      returnlifes();
      let lifes = reducelifes();
      lifes = reducelifes();
      lifes = reducelifes();
      assert.equal(lifes, 0);
    });
  });
});
