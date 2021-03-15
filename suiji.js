// 2.一句代码生成一个[1-100]的数组
// 方式1
const arr1 = [...Array(100).keys()] 
// 方式2
const arr2 = Array.from(Array(100), (e, i) => i + 1)
console.log(arr1)
console.log(arr2)