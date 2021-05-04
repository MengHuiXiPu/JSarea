## Promise.any 的作用，如何自己实现一个 Promise.any

本文从五个方面介绍 `Promise.any` ：

- `Promise.any` 的作用
- `Promise.any` 应用场景
- `Promise.any` vs `Promise.all`
- `Promise.any` vs `Promise.race`
- 手写 `Promise.any` 实现

下面正文开始👇

## Promise.any

`Promise.any()` 是 ES2021 新增的特性，它接收一个 `Promise` 可迭代对象（例如数组），

- 只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise`
- 如果可迭代对象中没有一个 `promise` 成功（即所有的 `promises` 都失败/拒绝），就返回一个失败的 `promise` 和 `AggregateError` 类型的实例，它是 `Error` 的一个子类，用于把单一的错误集合在一起

```
const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.resolve('result'),
]

Promise.any(promises).then((value) => {
  console.log('value: ', value)
}).catch((err) => {
  console.log('err: ', err)
})

// value:  result
```

如果所有传入的 `promises` 都失败：

```
const promises = [
  Promise.reject('ERROR A'),
  Promise.reject('ERROR B'),
  Promise.reject('ERROR C'),
]

Promise.any(promises).then((value) => {
  console.log('value：', value)
}).catch((err) => {
  console.log('err：', err)
  console.log(err.message)
  console.log(err.name)
  console.log(err.errors)
})

// err：AggregateError: All promises were rejected
// All promises were rejected
// AggregateError
// ["ERROR A", "ERROR B", "ERROR C"]
```

## Promise.any 应用场景

- 从最快的服务器检索资源

  来自世界各地的用户访问网站，如果你有多台服务器，则尽量使用响应速度最快的服务器，在这种情况下，可以使用 `Promise.any()` 方法从最快的服务器接收响应

```
  function getUser(endpoint) {
    return fetch(`https://superfire.${endpoint}.com/users`)
      .then(response => response.json());
  }
  
  const promises = [getUser("jp"), getUser("uk"), getUser("us"), getUser("au"), getUser("in")]
  
  Promise.any(promises).then(value => {
    console.log(value)
  }).catch(err => {
    console.log(err);
  })
```

- 显示第一张已加载的图片（来自MDN）

  在这个例子，我们有一个获取图片并返回 `blob` 的函数，我们使用 `Promise.any()` 来获取一些图片并显示第一张有效的图片（即最先 resolved 的那个 promise）

```
  function fetchAndDecode(url) {
    return fetch(url).then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.blob();
      }
    })
  }
  
  let coffee = fetchAndDecode('coffee.jpg');
  let tea = fetchAndDecode('tea.jpg');
  
  Promise.any([coffee, tea]).then(value => {
    let objectURL = URL.createObjectURL(value);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch(e => {
    console.log(e.message);
  });
```

## Promise.any vs Promise.all

`Promise.any()` 和 `Promise.all()` 从返回结果来看，它们 **彼此相反** ：

- `Promise.all()` ：任意一个 `promise` 被 `reject` ，就会立即被 `reject` ，并且 `reject` 的是第一个抛出的错误信息，只有所有的 `promise` 都 `resolve` 时才会 `resolve` 所有的结果
- `Promise.any()` ：任意一个 `promise` 被 `resolve` ，就会立即被 `resolve` ，并且 `resolve` 的是第一个正确结果，只有所有的 `promise` 都 `reject` 时才会 `reject` 所有的失败信息

另外，它们又有不同的 **重点** ：

- `Promise.all()` 对所有实现都感兴趣。相反的情况（至少一个拒绝）导致拒绝。
- `Promise.any()` 对第一个实现感兴趣。相反的情况（所有拒绝）导致拒绝。

## Promise.any vs Promise.race

`Promise.any()` 和 `Promise.race()` 的 **关注点** 不一样：

- `Promise.any()` ：关注于 `Promise` 是否已经解决
- `Promise.race()` ：主要关注 `Promise` 是否已经解决，无论它是被解决还是被拒绝

## 手写 Promise.any 实现

```
Promise.any` 只要传入的 `promise` 有一个是 `fullfilled` 则立即 `resolve` 出去，否则将所有 `reject` 结果收集起来并返回 `AggregateError
MyPromise.any = function(promises){
  return new Promise((resolve,reject)=>{
    promises = Array.isArray(promises) ? promises : []
    let len = promises.length
    // 用于收集所有 reject 
    let errs = []
    // 如果传入的是一个空数组，那么就直接返回 AggregateError
    if(len === 0) return reject(new AggregateError('All promises were rejected'))
    promises.forEach((promise)=>{
      promise.then(value=>{
        resolve(value)
      },err=>{
        len--
        errs.push(err)
        if(len === 0){
          reject(new AggregateError(errs))
        }
      })
    })
  })
}
```

 