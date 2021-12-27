# 几个少见却很有用的 JS 技巧

## 1. “返回”按钮

使用 `history.back()` 可以创建一个浏览器“返回”按钮。

```
<button onclick="history.back()">
    返回
</button>     
```

## 2. 数字分隔符

为了提高数字的可读性，您可以使用下划线作为分隔符：

```
const largeNumber = 1_000_000_000;

console.log(largeNumber); // 1000000000
```

## 3. 事件监听器只运行一次

如果你想添加一个事件监听器并且只运行一次，你可以使用 `once` 选项：

```
element.addEventListener('click', () => console.log('I run only once'), {
    once: true
});           
```

## 4. console.log 变量包装

您在 `console.log()` 的时候，将参数用大括号括起来，这样可以同时看到变量名和变量值。![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

## 5. 从数组中获取最小值/最大值

您可以使用 `Math.min()` 或 `Math.max()` 结合扩展运算符来查找数组中的最小值或最大值。

```
const numbers = [6, 8, 1, 3, 9];

console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers)); // 1           
```

## 6. 检查 Caps Lock 是否打开

您可以使用 `KeyboardEvent.getModifierState()` 来检测是否 `Caps Lock` 打开。

```
const passwordInput = document.getElementById('password');

passwordInput.addEventListener('keyup', function (event) {
    if (event.getModifierState('CapsLock')) {
        // CapsLock 已经打开了
    }
});           
```

## 7. 复制到剪贴板

您可以使用 `Clipboard` API 创建“复制到剪贴板”功能：

```
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}           
```

## 8. 获取鼠标位置

您可以使用 `MouseEvent` 对象下 clientX 和 clientY 的属性值，获取鼠标的当前位置坐标信息。

```
document.addEventListener('mousemove', (e) => {
    console.log(`Mouse X: ${e.clientX}, Mouse Y: ${e.clientY}`);
});           
```

## 9. 缩短数组

您可以设置 length 属性来缩短数组。

```
const numbers = [1, 2, 3, 4, 5]

numbers.length = 3;

console.log(numbers); // [1, 2, 3]           
```

## 10. 简写条件判断语句

如果仅在判断条件为 `true` 时才执行函数，则可以使用 `&&` 简写。

```
// 普通写法
if (condition) {
    doSomething();
}

// 简写
condition && doSomething();           
```

## 11. console.table() 打印特定格式的表格

语法：

```
// [] 里面指的是可选参数
console.table(data [, columns]);
```

参数：

- data 表示要显示的数据。必须是数组或对象。
- columns 表示一个包含列的名称的数组。

实例：

```
// 一个对象数组，只打印 firstName
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

const john = new Person("John", "Smith");
const jane = new Person("Jane", "Doe");
const emily = new Person("Emily", "Jones");

console.table([john, jane, emily], ["firstName"]);
```

打印结果如下图：![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

## 12. 数组去重

```
const numbers = [2, 3, 4, 4, 2];

console.log([...new Set(numbers)]); // [2, 3, 4]           
```

## 13. 将字符串转换为数字

```
const str = '404';

console.log(+str) // 404;           
```

## 14. 将数字转换为字符串

连接空字符串。

```
const myNumber = 403;

console.log(myNumber + ''); // '403'           
```

## 15. 从数组中过滤所有虚值

```
const myArray = [1, undefined, NaN, 2, null, '@denicmarko', true, 3, false];

console.log(myArray.filter(Boolean)); // [1, 2, "@denicmarko", true, 3]     
```

## 16. 妙用 includes

```
const myTech = 'JavaScript';
const techs = ['HTML', 'CSS', 'JavaScript'];

// 普通写法
if (myTech === 'HTML' || myTech === 'CSS' || myTech === 'JavaScript') {
    // do something
}

// includes 写法
if (techs.includes(myTech)) {
    // do something 
}           
```

## 17. 妙用 reduce 对数组求和

```
const myArray = [10, 20, 30, 40];
const reducer = (total, currentValue) => total + currentValue;

console.log(myArray.reduce(reducer)); // 100           
```

## 18. `console.log()` 样式

您知不知道可以使用 CSS 语句在 DevTools 中设置 `console.log` 输出的样式：![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

## 19. 元素的 dataset

使用 `dataset` 属性访问元素的自定义数据属性 (`data-*`)：

```
<div id="user" data-name="John Doe" data-age="29" data-something="Some Data">
    John Doe
</div>

<script>
    const user = document.getElementById('user');
  
    console.log(user.dataset); 
    // { name: "John Doe", age: "29", something: "Some Data" }
  
    console.log(user.dataset.name); // "John Doe"
    console.log(user.dataset.age); // "29"
    console.log(user.dataset.something); // "Some Data"
</script>     
```

## 相关推荐

