// filter()
// 对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回

let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3