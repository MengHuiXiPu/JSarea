// every()
// 对数组每一项都运行传入的函数，如果对每一项函数都返回 true ，则这个方法返回 true

let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult) // false