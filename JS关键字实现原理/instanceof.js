// instance of 用于判断数据类型
// prototype constructor type of

//手动实现instance of 
let myInstanceof = (target,origin) => {
    while(target) {
        if(target.__proto__===origin.prototype) {
           return true
        }
        target = target.__proto__
    }
    return false
}
let a = [1,2,3]
console.log(myInstanceof(a,Array));  // true
console.log(myInstanceof(a,Object));  // true