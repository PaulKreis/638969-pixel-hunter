import {assert} from 'chai';
import {reduceTimer, initTimer} from '../utils/timer.js';

describe(`Timer tests`, () => {
  describe(`Base tests`, () => {
    it(`Return 29 sec on 1 timer call`, () => {
      let timer = reduceTimer();
      assert.equal(timer, 29);
    });

    it(`Return 20 sec on 10 timer call`, () => {
      initTimer();
      let timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      timer = reduceTimer();
      assert.equal(timer, 20);
    });
  });
});
