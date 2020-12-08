const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map((num) => num + 1);


// bad
function * foo() {
    // ...
  }
  
  // bad
  const bar = function * () {
    // ...
  };
  
  // bad
  const baz = function *() {
    // ...
  };
  
  // bad
  const quux = function*() {
    // ...
  };
  
  // bad
  function*foo() {
    // ...
  }
  
  // bad
  function *foo() {
    // ...
  }
  
  // very bad
  function
  *
  foo() {
    // ...
  }
  
  // very bad
  const wat = function
  *
  () {
    // ...
  };
  
  // good
  function* foo() {
    // ...
  }
  
  // good
  const foo = function* () {
    // ...
  };