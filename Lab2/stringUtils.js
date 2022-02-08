const checkForValidStr = (str, functionName) => {
    if (str == undefined) {
        throw `${functionName} does not have any parameters.`;
    }
    if (typeof str !== "string") {
        throw `Enter a valid string`;
    }
    if (str.trim().length === 0) {
        throw `String you have entered is empty.`;
    }
};
const checkForValidChar = (c) => {
    if (c == undefined) {
        throw `Character is undefined`;
    }
    if (typeof c === "number") {
        throw `Number is not allowed`;
    }
};
const checkForValidIndex = (str, index) => {
    if (!(0 < index && index < str.length)) {
        throw `Invalid Index: need "before" and "after" element for further instructions`;
    }
};

const sortString = (str) => {
    checkForValidStr(str, "sortString() function");
    arr = str.split("");

    const isSpecialCharacter = (element) => {
        let ascii = element.charCodeAt();
        if (
            (32 < ascii && ascii <= 47) ||
            (58 <= ascii && ascii <= 64) ||
            (91 <= ascii && ascii <= 96) ||
            (123 <= ascii && ascii <= 126)
        ) {
            return true;
        } else return false;
    };

    const isNumber = (element) => {
        let ascii = element.charCodeAt();
        if (48 <= ascii && ascii <= 57) {
            return true;
        } else {
            return false;
        }
    };

    const isUpper = (element) => {
        let ascii = element.charCodeAt();
        if (65 <= ascii && ascii <= 90) {
            return true;
        } else {
            return false;
        }
    };

    const isLower = (element) => {
        let ascii = element.charCodeAt();
        if (97 <= ascii && ascii <= 122) {
            return true;
        } else {
            return false;
        }
    };

    const isSpace = (element) => {
        if (element === " ") {
            return true;
        } else {
            return false;
        }
    };

    arr.sort((a, b) => {
        if (isUpper(a) && isUpper(b)) {
            return a.localeCompare(b);
        }
        if (isUpper(a) && isLower(b)) {
            return -1;
        }
        if (isUpper(a) && isSpecialCharacter(b)) {
            return -1;
        }
        if (isUpper(a) && isNumber(b)) {
            return -1;
        }
        if (isUpper(a) && isSpace(b)) {
            return -1;
        }
        if (isLower(a) && isUpper(b)) {
            return 1;
        }
        if (isLower(a) && isLower(b)) {
            return a.localeCompare(b);
        }
        if (isLower(a) && isSpecialCharacter(b)) {
            return -1;
        }
        if (isLower(a) && isNumber(b)) {
            return -1;
        }
        if (isLower(a) && isSpace(b)) {
            return -1;
        }
        if (isSpecialCharacter(a) && isUpper(b)) {
            return 1;
        }
        if (isSpecialCharacter(a) && isLower(b)) {
            return 1;
        }
        if (isSpecialCharacter(a) && isSpecialCharacter(b)) {
            if (a.charCodeAt > b.charCodeAt) return 1;
            else if (b.charCodeAt > a.charCodeAt) return -1;
            else return 0;
        }
        if (isSpecialCharacter(a) && isNumber(b)) {
            return -1;
        }
        if (isSpecialCharacter(a) && isSpace(b)) {
            return -1;
        }
        if (isNumber(a) && isUpper(b)) {
            return 1;
        }
        if (isNumber(a) && isLower(b)) {
            return 1;
        }
        if (isNumber(a) && isSpecialCharacter(b)) {
            return 1;
        }
        if (isNumber(a) && isNumber(b)) {
            return a - b;
        }
        if (isNumber(a) && isSpace(b)) {
            return -1;
        }
        if (isSpace(a) && isUpper(b)) {
            return 1;
        }
        if (isSpace(a) && isLower(b)) {
            return 1;
        }
        if (isSpace(a) && isSpecialCharacter(b)) {
            return 1;
        }
        if (isSpace(a) && isNumber(b)) {
            return 1;
        }
        if (isSpace(a) && isSpace(b)) {
            return 0;
        }
    });
    return `"${arr.join("")}"`;
};

const replaceChar = (str, index) => {
    checkForValidStr(str, "replaceChar() function");
    checkForValidIndex(str, index);
    arr = str.split("");
    count = 0;
    let before = arr[index - 1];
    let after = arr[index + 1];

    for (i = 0; i < arr.length; i++) {
        if (arr[i] == arr[index] && i != index) {
            if (count % 2 == 0) {
                arr[i] = before;
                count += 1;
            } else {
                arr[i] = after;
                count += 1;
            }
        }
    }
    return arr.join("");
};

const mashUp = (str1, str2, c) => {
    checkForValidStr(str1, "mashUp() function");
    checkForValidStr(str2, "mashUp() function");
    checkForValidChar(c);
    let str = [];

    for (i = 0; i < Math.max(str1.length, str2.length) * 2; i++) {
        if (i % 2 == 0) {
            if (i / 2 < str1.length) {
                str[i] = str1[i / 2];
            } else {
                str[i] = c;
            }
        } else if (i % 2 == 1) {
            if (Math.floor(i / 2) < str2.length) {
                str[i] = str2[Math.floor(i / 2)];
            } else {
                str[i] = c;
            }
        }
    }
    return str.join("");
};

module.exports = {
    firstName: "Utsav",
    LastName: "Italiya",
    studentId: "10475248",
    sortString,
    replaceChar,
    mashUp,
};
