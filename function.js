// bad
function foo() {
    // ...
  }
  
  // bad
  const foo = function () {
    // ...
  };
  
  // good
  // lexical name distinguished from the variable-referenced invocation(s)
  const short = function longUniqueMoreDescriptiveLexicalFoo() {
    // ...
  };


// 自执行函数。常用于执行配置文件，只会执行一次
  // immediately-invoked function expression (IIFE)
(function () {
    console.log('Welcome to the Internet. Please follow me.');
  }());


  // bad
if (currentUser) {
    function test() {
      console.log('Nope.');
    }
  }
  
  // good
  let test;
  if (currentUser) {
    test = () => {
      console.log('Yup.');
    };
  }


//j
  // bad
function foo(name, options, arguments) {
    // ...
  }
  
  // good
  function foo(name, options, args) {
    // ...
  }




  // bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}



// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}


// 后加加
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3



// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}

// bad
function f1(a) {
  a = 1;
  // ...
}
function f2(a) {
  if (!a) { a = 1; }
  // ...
}
// good
function f3(a) {
  const b = a || 1;
  // ...
}
function f4(a = 1) {
  // ...
}


// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);
// good
const x = [1, 2, 3, 4, 5];
console.log(...x);
// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));
// good
new Date(...[2016, 8, 5]);