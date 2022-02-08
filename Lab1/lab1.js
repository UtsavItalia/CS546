const questionOne = function questionOne(arr) {
  let newArr = [];
  let myObj = {};
  let prime;

  if (!arr) {
    return myObj;
  }

  arr.forEach((element) => {
    let value = Math.abs(Math.pow(element, 2) - 7);
    newArr.push(value);
  });

  newArr.forEach((element) => {
    if (element == 1) {
      prime = false;
      myObj[element] = prime;
    } else if (element == 2) {
      prime = true;
      myObj[element] = prime;
    } else if (element > 2) {
      for (let i = 2; i < element; i++) {
        if (element % i == 0) {
          prime = false;
          myObj[element] = prime;
          break;
        } else {
          prime = true;
          myObj[element] = prime;
        }
      }
    }
  });
  return myObj;
};

const questionTwo = function questionTwo(arr) {
  let arrWithoutDuplicate = [];

  arr.forEach((element) => {
    if (arrWithoutDuplicate.includes(element) == false) {
      arrWithoutDuplicate.push(element);
    }
  });

  return arrWithoutDuplicate;
};

const questionThree = function questionThree(arr) {
  // Implement question 3 here
  let arrWithSortedStr = [];
  let myObj = {};

  arr.forEach((element) => {
    let x = element.split("");
    x = x.sort();
    x = x.join("");
    arrWithSortedStr.push(x);
  });

  arrWithSortedStr.forEach((element) => {
    let arrWithSameAnagram = [];
    for (let i = 0; i < arrWithSortedStr.length; i++) {
      if (
        element == arrWithSortedStr[i] &&
        !arrWithSameAnagram.includes(arr[i])
      ) {
        arrWithSameAnagram.push(arr[i]);
      }
    }
    if (arrWithSameAnagram.length > 1) {
      myObj[element] = arrWithSameAnagram;
      arrWithSameAnagram = [];
    }
  });

  return myObj;
};

const questionFour = function questionFour(num1, num2, num3) {
  let factArr = [];
  let divisor = (num1 + num2 + num3) / 3;
  let sum = 0;

  function findFactorial(n) {
    let factorial = 1;
    while (n >= 1) {
      factorial = factorial * n;
      n--;
    }
    factArr.push(factorial);
  }

  findFactorial(num1);
  findFactorial(num2);
  findFactorial(num3);

  factArr.forEach((element) => {
    sum = sum + element;
  });
  let avg = Math.floor(sum / divisor);
  return avg;
};

module.exports = {
  firstName: "Utsav",
  lastName: "Italiya",
  studentId: "10475248",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
