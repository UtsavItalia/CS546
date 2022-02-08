const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");
const { modeSquared, medianElement, merge, average } = require("./arrayUtils");
const { sortString, replaceChar, mashUp } = require("./stringUtils");
const { computeObjects, commonKeys, flipObject } = require("./objUtils");

//average() Test Cases
// try {
//     // Should Pass

//     // const averageOne = average([[1], [2], [3]]);
//     const averageOne = average([
//         [1, 3],
//         [2, 4, 5],
//     ]);
//     console.log(averageOne);
//     console.log("average() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("average() failed test case\n");
// }

// try {
//     // Should Fail

//     const averageTwo = average([
//         [1, 3],
//         ["hi", 4, 5],
//     ]);
//     // const averageTwo = average([[1, 3], []]);
//     // const averageTwo = average([[1, 3], []]);
//     // const averageTwo = average([]);
//     // const averageTwo = average("banana");
//     // const averageTwo = average(["guitar", 1, 3, "apple"]);
//     // const averageTwo = average();

//     console.log(averageTwo);
//     console.error("average() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("average() failed successfully\n");
// }

// //modeSquared() Test Cases
// try {
//     //Should Pass

//     const modeSquaredOne = modeSquared([1, 2, 3, 3, 4]);
//     console.log(modeSquaredOne);
//     console.log("modeSquared() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("modeSquared() failed test case\n");
// }

// try {
//     // Should Fail

//     const modeSquaredTwo = modeSquared([]);
//     // const modeSquaredTwo = modeSquared("banana");
//     // const modeSquaredTwo = modeSquared(1, 2, 3);
//     // const modeSquaredTwo = modeSquared(["guitar", 1, 3, "apple"]);
//     // const modeSquaredTwo = modeSquared();
//     console.log(modeSquaredTwo);
//     console.error("modeSquared() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("modeSquared() failed successfully\n");
// }

// //medianElement() Test Cases
try {
    //Should Pass

    const medianElementOne = medianElement([3, 20, 6, 8, 9]);
    console.log(medianElementOne);
    console.log("medianElement() passed successfully\n");
} catch (e) {
    console.log(e);
    console.error("medianElement() failed test case\n");
}

// try {
//     // Should Fail

//     const medianElementTwo = medianElement();
//     // const medianElementTwo = medianElement(5, 6, 7);
//     // const medianElementTwo = medianElement([]);
//     // const medianElementTwo = medianElement("test");
//     // const medianElementTwo = medianElement([1, 2, "nope"]);
//     console.log(medianElementTwo);
//     console.error("medianElement() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("medianElement() failed successfully\n");
// }

// //merge() Test Cases
// try {
//     //Should Pass

//     // const mergeOne = merge([1, 2, 3], [3, 1, 2]);
//     const mergeOne = merge([1, 2, 3, "g"], ["d", "a", "s"]);
//     // const mergeOne = merge(["A", "B", "a"], [1, 2, "Z"]);
//     console.log(mergeOne);
//     console.log("merge() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("merge() failed test case\n");
// }

// try {
//     // Should Fail

//     const mergeTwo = merge([null, null, null], [null, null, null]);
//     // const mergeTwo = merge([], ["ab", "ts"]);

//     console.log(mergeTwo);
//     console.error("merge() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("merge() failed successfully\n");
// }

// //sortString() Test Cases
// try {
//     //Should Pass

//     const sortStringOne = sortString("123 FOO BAR!");
//     console.log(sortStringOne);
//     console.log("sortString() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("sortString() failed test case\n");
// }

// try {
//     // Should Fail

//     const mergeTwo = merge([], ["ab", "ts"]);
//     // const sortStringTwo = sortString();
//     // const sortStringTwo = sortString("");
//     // const sortStringTwo = sortString(123);
//     // const sortStringTwo = sortString(["Hello", "World"]);

//     console.log(sortStringTwo);
//     console.error("sortString() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("sortString() failed successfully\n");
// }

// //replaceChar() Test Cases
// try {
//     //Should Pass

//     const replaceCharOne = replaceChar("Daddy", 2);
//     console.log(replaceCharOne);
//     console.log("replaceChar() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("replaceChar() failed test case\n");
// }

// try {
//     // Should Fail

//     const replaceCharTwo = replaceChar(123);
//     // const replaceCharTwo = replaceChar("");

//     console.log(replaceCharTwo);
//     console.error("replaceChar() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("replaceChar() failed successfully\n");
// }

// //replaceChar() Additional Test Fail Case
// try {
//     // Should Fail

//     const replaceCharThree = replaceChar("foobar", 0);
//     // const replaceCharTwo = replaceChar("");

//     console.log(replaceCharThree);
//     console.error("replaceChar() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("replaceChar() failed successfully\n");
// }

// //mashUp() Test Cases
// try {
//     //Should Pass

//     const mashUpOne = mashUp("Patrick", "Hill", "$");
//     // const mashUpOne = mashUp("hello", "world", "#");
//     // const mashUpOne = mashUp("Hi", "There", "@");

//     console.log(mashUpOne);
//     console.log("mashUp() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("mashUp() failed test case\n");
// }

// try {
//     // Should Fail

//     const mashUpTwo = mashUp("Patrick", "");
//     // const mashUpTwo = mashUp();
//     // const mashUpTwo = mashUp("John");

//     console.log(mashUpTwo);
//     console.error("mashUp() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("mashUp() failed successfully\n");
// }

// //mashUp() Additional Test Fail Case
// try {
//     // Should Fail

//     const mashupThree = mashUp("Patrick", "hill");

//     console.log(mashupThree);
//     console.error("mashUp() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("mashUp() failed successfully\n");
// }

// //computeObjects() Test Cases
// try {
//     //Should Pass

//     const first = { x: 2, y: 3 };
//     const second = { a: 70, x: 4, z: 5 };
//     const third = { x: 0, y: 9, q: 10 };

//     const computeObjectsOne = computeObjects(
//         [first, second, third],
//         (x) => x * 2,
//     );

//     console.log(computeObjectsOne);
//     console.log("computeObjects() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("computeObjects() failed test case\n");
// }

// try {
//     // Should Fail

//     const first = { x: 2, y: 3 };
//     const second = { a: 70, x: 4, z: 5 };
//     const third = { x: 0, y: 9, q: 10 };

//     // const computeObjectsTwo = computeObjects();
//     // const computeObjectsTwo = computeObjects([], (x) => x * 2);
//     // const computeObjectsTwo = computeObjects([{}, { a: 4 }], (x) => x * 2);
//     const computeObjectsTwo = computeObjects([{ x: 2, y: "a" }], (x) => x * 2);
//     // const computeObjectsTwo = computeObjects([first, second], "a");

//     console.log(computeObjectsTwo);
//     console.error("computeObjects() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("computeObjects() failed successfully\n");
// }

// // computeObjects() Additinal Test Cases
// try {
//     // Should Fail

//     const first = { x: 2, y: 3 };
//     const second = { a: 70, x: 4, z: 5 };
//     const third = { x: 0, y: 9, q: 10 };

//     const computeObjectsThree = computeObjects(
//         [{ x: 2, y: "a" }],
//         (x) => x * 2,
//     );

//     console.log(computeObjectsThree);
//     console.error("computeObjects() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("computeObjects() failed successfully\n");
// }

// try {
//     // Should Fail

//     const first = { x: 2, y: 3 };
//     const second = { a: 70, x: 4, z: 5 };
//     const third = { x: 0, y: 9, q: 10 };

//     const computeObjectsFour = computeObjects([first, second], "a");

//     console.log(computeObjectsFour);
//     console.error("computeObjects() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("computeObjects() failed successfully\n");
// }

// //commonKeys() Test Cases
// try {
//     //Should Pass

//     const first = { a: 2, b: 4 };
//     const second = { a: 5, b: 4 };
//     const third = { a: 2, b: { x: 7 } };
//     const fourth = { a: 3, b: { x: 7, y: 10 } };

//     // const commonKeysOne = commonKeys(first, second);
//     // const commonKeysOne = commonKeys(first, third);
//     // const commonKeysOne = commonKeys(first, fourth);
//     const commonKeysOne = commonKeys(third, fourth);

//     console.log(commonKeysOne);
//     console.log("commonKeys() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("commonKeys() failed test case\n");
// }

// try {
//     // Should Fail

//     // const commonKeysTwo = commonKeys("hello");
//     const commonKeysTwo = flipObject({});

//     console.log(commonKeysTwo);
//     console.error("commonKeys() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("commonKeys() failed successfully\n");
// }

// //flipObject() Test Cases
// try {
//     //Should Pass

//     const flipObjectOne = flipObject({ a: 3, b: 7, c: { x: 1 } });

//     console.log(flipObjectOne);
//     console.log("flipObject() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("flipObject() failed test case\n");
// }

// try {
//     // Should Fail

//     const flipObjectTwo = flipObject("hello");
//     // const flipObjectTwo = flipObject({});

//     console.log(flipObjectTwo);
//     console.error("flipObject() did not error\n");
// } catch (e) {
//     console.log(e);
//     console.log("flipObject() failed successfully\n");
// }

// //flipObjects() Additional Case
// try {
//     //Should Pass

//     const flipObjectThree = flipObject({ a: 3, y: [1, 2, 4], c: { b: 5 } });

//     console.log(flipObjectThree);
//     console.log("flipObject() passed successfully\n");
// } catch (e) {
//     console.log(e);
//     console.error("flipObject() failed test case\n");
// }
