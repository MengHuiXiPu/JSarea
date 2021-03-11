// JS之类数组
// 类数组
// 定义：
// 拥有length属性，其属性（索引）为非负整数
// 不具有数组的所具有的方法
// 类数组与非类数组的比较

// 类数组：
var obj = {
    0: "a",
    1: "第二",
    4: "1234",
    length: 3
};
console.log(obj);

// 　非类数组：

var obj = {
    0: "a",
    1: "第二",
    4: "1234"
};

// 没有length属性，所以就不是类数组。
// javascript中常见的类数组有arguments对象和DOM方法的返回结果。
// 比如 document.getElementsByTagName()。
// 类数组对象转化为数组：
// 有时候使用类数组最好的方式就是转化为数组
// 可以通过splice方法区转换。

var obj = {
    0: "a",
    1: "第二",
    4: "1234",
    length: 4,
    splice: Array.prototype.splice,
}


// 二、类数组和数组的区别 
// ① instanceof
// ② constructor
// ③ toString（）
// ④ ES 提供的方法 isArray（）

const Student = function (name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
}
let s1 = new Student('zhangsan', '11', false)
console.log(s1, 'sssss')

function nameInstanceOf(a,b) {
    return a instanceof b
}

console.log(nameInstanceOf(s1,Student))