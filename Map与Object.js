//map 和obj的差别
// map是es6新增的数据结构 。类似object 
// object 本质上是哈希结构的键值对组合，它只能存储字符串或者symbol等简单数据类型做建，而map打破了这个限制

// 1.同名碰撞 (只能存在一个key)
// 2.可迭代 map实现了迭代器，可用for...of 遍历 而object不行
// 3.长度 Map 可以直接拿到长度，而object不行
// 4.有序性 填入Map的元素 会保持原有的顺序 而object无法做到
// 5，可展开Mapk可以使用省略语法展开，而object不行

let m = new Map()
m.set({}, 'a')
m.set({}, 'b')
m.set({}, 'c')
m.set({}, 'd')
for(let v of m){
    console.log(v[0])
    console.log(v[1])
}
console.log(m,m.size,[...m])

let obj = {}
let b = {}
obj.b = '1'
obj.b = 'c'
obj.b = 'd'
obj.b = 'A'
console.log(obj)