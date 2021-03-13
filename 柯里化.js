// 在 JavaScript 中，函数柯里化是函数式编程的重要思想，也是高阶函数中一个重要的应用，其含义是给函数分步传递参数，每次传递部分参数，并返回一个更具体的函数接收剩下的参数，这中间可嵌套多层这样的接收部分参数的函数，直至返回最后结果。
/ 柯里化拆分
// 原函数
function add(a, b, c) {
    return a + b + c;
}

// 柯里化函数
function addCurrying(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}

// 调用原函数
add(1, 2, 3); // 6

// 调用柯里化函数
addCurrying(1)(2)(3) // 6
// 被柯里化的函数 addCurrying 每次的返回值都为一个函数，并使用下一个参数作为形参，直到三个参数都被传入后，返回的最后一个函数内部执行求和操作，其实是充分的利用了闭包的特性来实现的。


// 柯里化通用式 ES6
function currying(func, args = []) {
    let arity = func.length;

    return function (..._args) {
        _args.unshift(...args);

        if(_args.length < arity) {
            return currying(func, _args);
        }

        return func(..._args);
    }
}
// 函数 currying 算是比较高级的转换柯里化的通用式，可以随意拆分参数，假设一个被转换的函数有多个形参，我们可以在任意环节传入任意个数的参数进行拆分，举一个例子，假如 5 个参数，第一次可以传入 2 个，第二次可以传入 1 个, 第三次可以传入剩下的，也有其他的多种传参和拆分方案，因为在 currying 内部收集参数的同时按照被转换函数的形参顺序进行了更正。