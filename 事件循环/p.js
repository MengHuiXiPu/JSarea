//宏任务是宿主发起的，微任务是JS触发的
// 宏任务：setTimeout setInterval MessageChannel I/O，事件队列  script代码块
//微任务 promise.[then/catch/fanliy], process.nextTick quenemicrotadk
// 如何理解 代码块是宏任务
// // 存在两个代码块 会首先执行第一个代码块的内容，如果此时进入了微任务队列，第一个代码块执行完以后会首先清空微任务队列，再去开启第二个代码块的执行，所以这里应该能理解整个代码块为什么是宏任务。
// 判断宏任务队列是否为空

// 不空 --> 执行最早进入队列的任务 --> 执行下一步
// 空 --> 执行下一步
// 判断微任务队列是否为空

// 不空 --> 执行最早进入队列的任务 --> 继续检查微任务队列空不空
// 空 --> 执行下一步
// 因为首次执行宏队列中会有 script（整体代码块）任务，所以实际上就是 Js 解析完成后，在异步任务中，会先执行完所有的微任务，这里也是很多面试题喜欢考察的。需要注意的是，新创建的微任务会立即进入微任务队列排队执行，不需要等待下一次轮回。



Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

