//es2021
// Promise.any
// Promise.any 方法和 Promise.race 类似——只要给定的迭代中的一个 promise 成功，就采用第一个 promise 的值作为它的返回值，但与 Promise.race 的不同之处在于——它会等到所有 promise 都失败之后，才返回失败的值：
const myFetch = url => setTimeout(() => fetch(url), Math.floor(Math.random() * 3000));
const promises = [
  myFetch('/endpoint-1'),
  myFetch('/endpoint-2'),
  myFetch('/endpoint-3'),
];
// 使用 .then .catch
Promise.any(promises) // 任何一个 promise 成功。
       .then(console.log) // 比如 ‘3’
       .catch(console.error); // 所有的 promise 都失败了
// 使用 async-await
try {
  const first = await Promise.any(promises); // 任何一个 promise 成功返回。
 console.log(first);
}catch (error) { // 所有的 promise 都失败了
  console.log(error);
}
