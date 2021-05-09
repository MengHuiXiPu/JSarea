///
// 截至 ES10 规范，数组共包含 35 个标准的 API 方法和一个非标准的 API 方法
// 创建数组：Array.of、Array.from
// 改变自身(9 种)：pop、push、shift、unshift、reverse、sort、splice、copyWithin、fill
// 不改变自身(12 种)：concat、join、slice、toString、toLocaleString、valueOf、indexOf、lastIndexOf、未形成标准的 toSource，以及 ES7 新增的方法 includes，以及 ES10 新增的方法 flat、flatMap
// 不会改变自身的遍历方法一共有(12 种)：forEach、every、some、filter、map、reduce、reduceRight，以及 ES6 新增的方法 find、findIndex、keys、values、entries。
// 本文就不给大家一一去介绍这些 API 的用法了，目的是为大家起个

//回忆，JS数组删除某个元素
let num=['a','b','v','d','b','r','h','b']
let a=num.splice(2,1)
console.log(num,a)