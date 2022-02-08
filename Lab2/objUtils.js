const checkIdealArrayInput = (arr, functionName) => {
    if (arr === undefined) {
        throw `${functionName} does not have any parameters.`;
    }
    if (!Array.isArray(arr)) {
        throw `element ${arr} is not an Array.`;
    }
    if (arr.length == 0) {
        throw `element [] is an empty Array.`;
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
const checkObjectValues = (myObj, functionName) => {
    if (myObj === undefined || typeof myObj !== "object") {
        throw `${functionName} does not have right parameters.`;
    }
    if (Object.keys(myObj).length === 0) {
        throw `this object is empty object`;
    }
};
const checkIfFunction = (f) => {
    if (typeof f !== "function") {
        throw `this is not a function`;
    }
};

const computeObjects = (arrOfObj, func) => {
    checkIfFunction(func);
    checkIdealArrayInput(arrOfObj, "computeObjects() function");
    let myObj = {};
    for (i = 0; i < arrOfObj.length; i++) {
        obj = arrOfObj[i];
        checkObjectValues(obj);
        for (let key in obj) {
            checkIfNotANumber(obj[key]);
            if (!myObj.hasOwnProperty(key)) {
                myObj[key] = func(obj[key]);
            } else {
                myObj[key] = myObj[key] + func(obj[key]);
            }
        }
    }
    return myObj;
};

const commonKeys = (obj1, obj2) => {
    checkObjectValues(obj1, "commonKeys() function");
    checkObjectValues(obj2, "commonKeys() function");
    let obj = {};
    for (let key1 in obj1) {
        for (let key2 in obj2) {
            if (key1 == key2) {
                if (obj2[key2] == obj1[key1]) {
                    obj[key1] = obj1[key1];
                } else if (typeof obj1[key1] === "object") {
                    obj[key1] = commonKeys(obj1[key1], obj2[key2]);
                }
            }
        }
    }
    return obj;
};
const flipObject = (obj) => {
    checkObjectValues(obj, "flipObject() function");
    let myObj = {};

    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            obj[key].forEach((element) => {
                myObj[element] = key;
            });
        } else if (!Array.isArray(obj[key]) && typeof obj[key] !== "object") {
            myObj[obj[key]] = key;
        } else if (typeof obj[key] == "object") {
            myObj[key] = flipObject(obj[key]);
        }
    }
    return myObj;
};

module.exports = {
    firstName: "Utsav",
    LastName: "Italiya",
    studentId: "10475248",
    computeObjects,
    commonKeys,
    flipObject,
};
