# 10个JavaScript常见高级知识点

#### **1. 防抖**

**定义：**在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

```
function debounce(fn, time){  let timer  return function(){    clearTimeout(timer)    let args = arguments    timer = setTimeout(()=>{      fn.apply(this, args)    }, time)  }}
```

#### **2. 节流**

**定义：**规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```
function throttle(fn, time) {  let timer = null  return function () {    if(timer) return    timer = setTimeout(() => {      fn.apply(this, arguments)      timer = null    }, time)  }}
```

#### **3. 高阶函数**

**定义：**接受和/或返回另外一个函数的函数被称为高阶函数。常见的像数组的map、reduce、filter这些都是高阶函数

// 简单的高阶函数function add(x, y, fn) {  return fn(x) + fn(y);}function fn(num) {  return Math.abs(num)}add(-5, 6, fn); // 11

#### **4. 函数柯里化**

**定义：**函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。

函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行。

示例：

```
// 普通的add函数function add(x, y) {  return x + y}// 柯里化后function curryingAdd(x) {  return function (y) {    return x + y  }}add(1, 2)           // 3curryingAdd(1)(2)   // 3
```

实现：

```
function curry(func) {  return function curried(...args) {    if (args.length >= func.length) {      return func.apply(this, args);    } else {      return function(...args2) {        return curried.apply(this, args.concat(args2));      }    }  };}
// 用例function sum(a, b, c) {  return a + b + c;}let curriedSum = curry(sum);console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用console.log(curriedSum(1)(2,3)); // 6，对第一个参数的柯里化console.log(curriedSum(1)(2)(3)); // 6，全柯里化
```



#### **5. 数组去重**

#### ① Set去重 

```
 const arr = [1,1,2,2,3,3,4,4,5,5]; const res = Array.from(new Set(arr)); console.log(res); // [1,2,3,4,5]
```

② filter去重 

```
const removeRepeat = (arr) => {  return arr.filter((item, index) => arr.indexOf(item, 0) === index)};
```

③ includes去重

```
const removeRepeat = (arr) => {  let repeatArr = [];  for (let i = 0, len = arr.length; i < len; i++) {    if (!repeatArr.includes(arr[i])) repeatArr.push(arr[i])  }  return repeatArr;};
```

#### **6. 数组扁平化**

①flat方法

```
const arr = [1, [2, [3, [4, 5]]], 6] function flatten(arr) {   return arr.flat(Infinity) // 嵌套深度 } console.log(flatten(arr)); // [1,2,3,4,5,6]
```

②toString 

```
function flatten(arr) {  return arr.toString().split(',').map(item => parseFloat(item))}console.log(flatten(arr));
```

③正则 

```
function flatten (arr) {  let str= JSON.stringify(arr).replace(/(\[|\])/g, '');  str = '[' + str + ']';  arr = JSON.parse(str);  return arr}console.log(flatten(arr))
```

④循环递归 

```
function flatten(arr) {  let result = [];  for (let i = 0; i < arr.length; i++) {    if (Array.isArray(arr[i])) { // 是数组就递归调用上面的扁平化一层的代码      result = result.concat(flatten(arr[i]));    } else { // 不是数组,直接通过push添加到返回值数组      result.push(arr[i])    }  }  return result}console.log(flatten(arr));
```

**7.深拷贝**

```
function deepClone(obj) {  // 原始类型和null直接返回  if (typeof obj !== 'object' || obj == null) return obj;
  let newObj = Array.isArray(obj) ? [] : {};  // 处理日期对象  if (obj instanceof Date) {    newObj = new Date(obj)  }  // 处理正则对象  if (obj instanceof RegExp) {    newObj = new RegExp(obj)  }  for (let key in obj) {    if (obj.hasOwnProperty(key)) {      // 如果属性为对象就进行递归      newObj[key] = typeof obj[key] == 'object' ? deepClone(obj[key]) : obj[key];    }  }  return newObj;}
```

#### **8. getBoundingCilentRect**

##### 什么是getBoundingCilentRect？

getBoundingCilentRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。该函数返回一个对象，该对象有6个属性：top,lef,right,bottom,width,height，如图：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/OvnShhIvBxSePYPmEGtjAuO5udspkjf1Gm3TmWUzF6mETPVMVFHiaCdm2oKe8RMdh3gCtAmjhnic068xuC4pyBjw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

##### 判断某个元素是否滚动到了可视区域内

```
window.onscroll = function() {  const box = document.querySelector(".box");  // 获取浏览器窗口可视化高度  const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight  // 获取box元素顶部到浏览器窗口顶部的距离  const boxTop = box.getBoundingClientRect().top  // 如果距离小于可视化窗口高度，就说明元素滚动到了可视区内  if (boxTop <= clientHeight) {    // 可以控制元素的显示隐藏或者进行其他操作  }}
```

#### **9. IntersectionObserver**

##### 定义和用途

Intersection Observer API提供了一种异步检测目标元素与祖先元素或视口(可统称为根元素)相交情况变化的方法。

如果想知道一个元素有没有进入到可视区域内，第一种方法就是使用getBoundingClientRect，但是需要持续监听页面的scroll事件，就会带来不可避免的性能问题，而Intersection Observer API的出现就是为了解决这一问题。

##### 使用方法

```
const observer = new IntersectionObserver(callback[, options]);
```

-  **callback(必填)**
  当目标元素和根元素的交集超过指定阈值触发回调函数，此函数可接受两个参数：entries和observer
- **options(可选)**
  用于配置回调函数触发的条件，有三个属性：

1. ①root - 指定根元素，默认为浏览器视口

2. ②rootMargin - 根元素的扩缩边距，控制计算根元素和目标元素的交集的区域范围

3. ③threshold - 阈值，回调函数触发的条件

##### 使用IntersectionObserver实现图片的懒加载

```
// html代码<body>  <img src="" data-origin="./images/desktop_1.jpg" alt="">  <img src="" data-origin="./images/desktop_2.jpg" alt="">  <img src="" data-origin="./images/desktop_3.jpg" alt="">  <img src="" data-origin="./images/desktop_4.jpg" alt=""></body>
// js代码function observe() {  let images = document.querySelectorAll('img');  let observer = new IntersectionObserver(entries => {    entries.forEach(item => {      if (item.isIntersecting) {        item.target.src = item.target.dataset.origin;        observer.unobserve(item.target);      }    });  }, {    rootMargin: '0px 0px 300px 0px' // 监视区向下扩展300px  });  images.forEach(item => observer.observe(item));}observe()
```

#### **10. 自定义事件**

##### **什么是自定义事件？**

在开发的过程中，我们会监听很多的事件，比如：点击事件(click)、鼠标移动事件(mousemove)等等。这些事件是js给我们提供的，但是有时候这些事件并不能满足我们的开发需要，这个时候就可以用自定义事件来解决。自定义事件可以让我们自主命名事件名，并且可以通过特定的方法进行添加，触发以及删除。

##### **如何使用**

目前实现自定义事件的两种主要方式是js的 Event() 构造函数和 CustomEvent() 构造函数来创建。

①Event

Event() 构造函数，用来创建一个新的事件对象 Event。 

// typeArg: string类型，表示创建事件的名称// eventInit: object类型，可选项，参数包括：bubbles-表示该事件是否冒泡；cancelable-表示该事件能否被取消；composed：指示事件是否会在影子DOM根节点之外触发侦听器。let myEvent = new Event(typeArg, eventInit);

演示：

const btn = document.querySelector('button');// 创建事件let myEvent = new Event('myEvent', {  bubbles: true // 是否冒泡});// 给按钮添加点击事件btn.addEventListener('click', function() {  // 触发自定义事件  dispatchEvent(myEvent)})// 给自定义事件添加事件监听器window.addEventListener('myEvent', function() {  console.log('触发了自定义事件') // 当调用 dispatchEvent(myEvent) 时就会触发监听})

②CustomEvent
CustomEvent() 构造函数, 创建一个新的事件对象 CustomEvent。

// typeArg: string类型，表示创建事件的名称// eventInit: object类型，可选项，参数包括：bubbles-表示该事件是否冒泡；cancelable-表示该事件能否被取消；detail：表示该事件中需要被传递的数据 let myEvent = new CustomEvent(typeArg, eventInit);

演示：

```
const btn = document.querySelector('button');// 创建事件let myEvent = new CustomEvent('myEvent', {  detail: { name: "黑马前端" } // });// 给按钮添加点击事件btn.addEventListener('click', function() {  // 触发自定义事件  dispatchEvent(myEvent)})// 给自定义事件添加事件监听器window.addEventListener('myEvent', function(e) {  console.log(`触发了自定义事件，name为${e.detail.name}`) // 当调用 dispatchEvent(myEvent) 时就会触发监听})
```

③Event 和 CustomEvent 区别
Event() 一般用来创建简单的自定义事件，而 CustomEvent() 支持传递参数的自定义事件，它支持 detail 参数，可以在detail中放一些需要传递的参数，并在事件监听函数中获取。 



