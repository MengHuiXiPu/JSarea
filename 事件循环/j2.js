// async与await
// async 是异步的意思，await则可以理解为等待
// 放到一起可以理解async就是用来声明一个异步方法，而 await是用来等待异步方法执行
// async
// async函数返回一个promise对象，下面两种方法是等效的

function f() {
    return Promise.resolve('TEST');
}

// asyncF is equivalent to f!
async function asyncF() {
    return 'TEST';
}

// await
// 正常情况下，await命令后面是一个 Promise对象，返回该对象的结果。如果不是 Promise对象，就直接返回对应的值

async function f(){
    // 等同于
    // return 123
    return await 123
}
f().then(v => console.log(v)) // 123

// 不管await后面跟着的是什么，await都会阻塞后面的代码

async function fn1 (){
    console.log(1)
    await fn2()
    console.log(2) // 阻塞
}

async function fn2 (){
    console.log('fn2')
}

fn1()
console.log(3)

// 上面的例子中，await 会阻塞下面的代码（即加入微任务队列），先执行 async外面的同步代码，同步代码执行完，再回到 async 函数中，再执行之前阻塞的代码
// 所以上述输出结果为：1，fn2，3，2