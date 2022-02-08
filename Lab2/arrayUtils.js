const checkIdeal3DArrayInput = (arr, functionName) => {
    if (arr === undefined) {
        throw `${functionName} does not have any parameters.`;
    }
    if (arr.length == 0) {
        throw `element [] is an empty Array.`;
    }
    if (!Array.isArray(arr)) {
        throw `element ${arr} is not an Array.`;
    }
};
const checkIfNotANumber = (element) => {
    if (typeof element !== "number") {
        throw `${element} is not a number`;
    }
    if (isNaN(element)) {
        throw `${element} element in NaN`;
    }
};

const checkIfNotANumberForMerge = (element) => {
    if (element === null) {
        throw `${element} element in not a number`;
    }
};

const average = (arrOfArr) => {
    checkIdeal3DArrayInput(arrOfArr, "average() Function");
    let sum = 0;
    let length = 0;
    arrOfArr.forEach((arr) => {
        checkIdeal3DArrayInput(arr, "average() Function");
        arr.forEach((element) => {
            checkIfNotANumber(element);
            sum += element;
            length += 1;
        });
    });
    return Math.round(sum / length);
};

const modeSquared = (arr) => {
    checkIdeal3DArrayInput(arr, "modeSquared() Function");
    let modeObj = {};

    count = 0;
    for (let i = 0; i < arr.length; i++) {
        checkIfNotANumber(arr[i]);
        if (modeObj[arr[i]] == undefined) {
            modeObj[arr[i]] = 1;
        } else {
            modeObj[arr[i]] += 1;
        }
    }

    //modeobj = { '1': 1, '2': 1, '3': 2, '4': 1 }
    let max = 0;
    let mode = 0;
    for (let key in modeObj) {
        if (max < modeObj[key]) {
            max = modeObj[key];
        }
    }
    for (let key in modeObj) {
        if (modeObj[key] == max) {
            mode += Math.pow(parseInt(key), 2);
        }
    }
    return mode;
};

const medianElement = (arr) => {
    checkIdeal3DArrayInput(arr, "medianElement() Function");
    medianObj = {};
    arr.sort((a, b) => a - b);
    for (let i = 0; i < arr.length; i++) {
        checkIfNotANumber(arr[i]);
        if (arr.length % 2 == 1) {
            medianObj[arr[Math.floor(arr.length / 2)]] = Math.floor(
                arr.length / 2,
            );
        } else {
            medianObj[
                (arr[Math.floor(arr.length / 2) - 1] +
                    arr[Math.floor(arr.length / 2)]) /
                    2
            ] = Math.floor(arr.length / 2);
        }
    }
    return medianObj;
};

const merge = (arr1, arr2) => {
    checkIdeal3DArrayInput(arr1, "merge() Function");
    checkIdeal3DArrayInput(arr2, "merge() Function");
    let arr = arr1.concat(arr2);

    for (let i = 0; i < arr.length; i++) {
        checkIfNotANumberForMerge(arr[i]);
    }
    arr.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") {
            if (a > b) return 1;
            else if (b > a) return -1;
            else return 0;
        }
        if (typeof a === "string" && typeof b === "number") {
            return -1;
        }
        if (typeof a === "number" && typeof b === "string") {
            return 1;
        }
        if (typeof a === "string" && typeof b === "string") {
            return a.localeCompare(b);
        }
    });
    return arr;
};

module.exports = {
    firstName: "Utsav",
    LastName: "Italiya",
    studentId: "10475248",
    average,
    modeSquared,
    medianElement,
    merge,
};
