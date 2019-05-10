// import { splitStr } from './unicode-split';

/**
 * @function textSplit
 * @desc Splits a given sentence into an array of words.
 * @param sentence a given sentence to split.
 */
export default function(sentence: string) {
  // return linebreakStr(sentence) || [];
  // ES6 supports: Array.from
  return Array.from(sentence)
  // return splitStr(sentence);
}

// import { LineBreaker } from 'linebreak-ts';
// import {default as LineBreaker} from '@craigmorton/linebreak';

// function linebreakStr(sentence) {
//   const breaker = new LineBreaker(sentence);
//   const result: string[] = [];
//   let bk;
//   let lastPos = 0;
//   // eslint-disable-next-line no-cond-assign
//   // tslint:disable-next-line: no-conditional-assignment
//   while (bk = breaker.nextBreak()) {
//     const word = sentence.slice(lastPos, bk.position);
//     lastPos = bk.position;
//     result.push(word);
//   }
//   // tslint:disable-next-line: triple-equals
//   return result.filter(i => i != null);
// }
