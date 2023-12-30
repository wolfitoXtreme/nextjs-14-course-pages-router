/* eslint-disable padding-line-between-statements */
export * from './types';
export * from './interfaces';
export * from './enums';

// sample usage
// import { SampleAI, SampleBI } from '@/types';

// const testFuncA:SampleAI =({ a, b }) => {
//   return `${a} ${b}`;
// };

// const testFuncB:SampleBI =(a, b) => {
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
