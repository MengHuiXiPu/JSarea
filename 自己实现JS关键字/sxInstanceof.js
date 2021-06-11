function C() { }
let c1 = new C()
console.log(c1 instanceof C, c1.__Proto__== C.prorotype)

// instanceof运算符用于检测构造函数的prororype属性是否出现在某个实例对象的原型链上。
// 原生的instanceof并不能支持检测基本数据类型。
//自动实现一个instanceof
function myInstanceof(instance,constructor){
    if(typeof instance != 'object' && typeof instance != 'function' || instance == null){
        return false
    }
    if(typeof constructor != 'function'){
        throw TypeError('the right-hand-side of instanceof must be a function')
    }
    let proto = constructor.prototype
    let p = instance.__proto__
    while(p != null){
        if(p == proto){
            return true
        }
        p = p.__proto__
    }
}