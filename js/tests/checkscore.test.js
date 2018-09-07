import {assert} from 'chai';
import {checkScore} from '../utils/checkscore.js';
describe(`Score checking tests`, () => {
  describe(`Base tests`, () => {
    it(`If answer <10 question return -1`, () => {
      const testanswers = [
        {correct: true, time: 10},
        {correct: false, time: 12},
        {correct: true, time: 18},
        {correct: false, time: 4},
        {correct: true, time: 11},
        {correct: false, time: 2},
        {correct: true, time: 11},
        {correct: false, time: 10},
        {correct: true, time: 10}
      ];
      const scores = checkScore(testanswers, 2);
      assert.equal(scores, -1);
    });

    it(`should recieve 1150 scores`, () => {
      const testanswers = [
        {correct: true, time: 11},
        {correct: true, time: 12},
        {correct: true, time: 18},
        {correct: true, time: 12},
        {correct: true, time: 11},
        {correct: true, time: 12},
        {correct: true, time: 11},
        {correct: true, time: 12},
        {correct: true, time: 13},
        {correct: true, time: 14}
      ];
      const scores = checkScore(testanswers, 3);
      assert.equal(scores, 1150);
    });

    it(`should recieve 1650 scores`, () => {
      const testanswers = [
        {correct: true, time: 9},
        {correct: true, time: 8},
        {correct: true, time: 8},
        {correct: true, time: 6},
        {correct: true, time: 2},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 2},
        {correct: true, time: 4}
      ];
      const scores = checkScore(testanswers, 3);
      assert.equal(scores, 1650);
    });
  });
});
