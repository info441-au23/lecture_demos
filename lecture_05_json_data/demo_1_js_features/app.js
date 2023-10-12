const name = "INFO441";
const date = "today";

let message = "Hello " + name + ", welcome to class. " + date + " we are covering\n";

message = `Hello ${name}, welcome to class. ${date} we are covering JSON.

We will also do HTTP Verbs.
`;


console.log(message);

// Part 2 Ternaries

let checkCondition = true;

const myOutput = (checkCondition) ? 'Check condition is true' : 'Check condition is false';

const errorMessage = 'The server failed';
const output2 = errorMessage || 'It worked!';
const data = null; //{'message': 'hello'};

console.log(data?.message);

const array = ['foo', 'bar', 'baz'];

console.log("\nTraditional for loop");
for(let i = 0; i < array.length; i++) {
    console.log(array[i]);
}

const loopingFunc = (value, i) => {
    console.log(`${i}: ${value}`);
    return `Hello ${value}`;
};

console.log("\nForEach")
const mapped = array.map(loopingFunc);

console.log("Mapped:")
console.log(mapped);

var myVar = 'whatever';

function myVarTest() {

    for(var i = 0; i < array.length; i++) {
        const insideLoop = 'value';
    }
}

const moreData = {'first_name': 'Tejus', 'lecture': 5};

const {first_name, lecture} = moreData;


console.log(first_name);

console.log([...array, 'zork']);