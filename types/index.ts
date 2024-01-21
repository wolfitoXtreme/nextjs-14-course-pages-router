/* eslint-disable padding-line-between-statements */
export * from './types';
export * from './interfaces';
export * from './enums';

// sample usage
// import { ISampleA, ISampleB } from '@/types';

// const testFuncA:ISampleA =({ a, b }) => {
//   return `${a} ${b}`;
// };

// const testFuncB:ISampleB =(a, b) => {
//   return `${a} ${b}`;
// };

// testFuncB('a', 5);

// type TestType = {
//   name: string,
//   age: number
// }
// interface TestFunc<P = TestType> {
//   (props: P): string
// }
// const testFunc:TestFunc<TestType> = ({name, age}) => `name: ${name}, age: ${age}`;
// console.log(testFunc({name: 'Charles', age: 50}));
