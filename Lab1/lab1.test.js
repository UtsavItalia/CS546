const lab1 = require("./lab1");

//QUESTION 1
console.log("Question 1 Output");
console.log(lab1.questionOne([5, 3, 10]));
//returns and outputs: {'18': false, '2': true, '93': false}

console.log(lab1.questionOne([2]));
// returns and outputs: {'3': true}

console.log(lab1.questionOne([]));
// returns and outputs: {}

console.log(lab1.questionOne());
// returns and outputs: {}

console.log(lab1.questionOne([1, 2, 3, 4, 5, 101]));
// returns and outputs: {'2': true, '3': true, '6': false, '9': false, '18': false, '10194': false }

//QUESTION 2
console.log("\n\n\nQuestion 2 Output");
console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
//returns and outputs: [1]

console.log(lab1.questionTwo([1, "1", 1, "1", 2]));
// returns and outputs: [1, '1', 2]

console.log(lab1.questionTwo([3, "a", "b", 3, "1"]));
// returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([]));
//returns and outputs: []

console.log(lab1.questionTwo(["UTSAV", "YOU", 2, 2, 3, "YOU"]));
//returns and outputs: [ 'UTSAV', 'YOU', 2, 3 ]

//QUESTION 3
console.log("\n\n\nQuestion 3 Output");
console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
// returns and outputs: { act: ["cat", "act"] }

console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// returns and outputs: { acer: ["race", "care"] }

console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// returns and outputs: {}

console.log(lab1.questionThree([]));
// returns and outputs: {}

console.log(lab1.questionThree(["utsav", "stevens", "satvu", "netsves"]));
// returns and outputs: { astuv: [ 'utsav', 'satvu' ], eensstv: [ 'stevens', 'netsves' ] }

//QUESTION 4
console.log("\n\n\nQuestion 4 Output");
console.log(lab1.questionFour(1, 3, 2));
//returns and outputs: 4

console.log(lab1.questionFour(2, 5, 6));
//returns and outputs: 194

console.log(lab1.questionFour(3, 4, 5));
//returns and outputs: 37

console.log(lab1.questionFour(10, 20, 30));
//returns and outputs: 1.3262642990609677e+31

console.log(lab1.questionFour(1, 1, 1));
//returns and outputs: 3
