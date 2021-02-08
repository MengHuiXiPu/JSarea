## JavaScript中实用的8个代码片段

### 1. 反转字符串

使用扩展符号`...`将字符串解析成数组。

```
const reverseString = string => [...string].reverse().join('');

reverseString('Medium'); // 'muideM'
```

### 2. 数阶乘

计算数据的阶乘，使用箭头函数和三元运算符。

```
const factorialOfNumber = number => 
  number < 0
    ? (() => {
      throw new TypeError('No negative numbers please');
    })()
    : number <= 1
      ? 1
      : number * factorialOfNumber(number - 1);
      
factorialOfNumber(4); // 24
```

### 3. 整数转数组

使用扩展符号`...`，并结合`map`方法。

```
const convertToArray = number => [...`${number}`].map(el => parseInt(el))

convertToArray(5678); // [5, 6, 7, 8]
```

> 注意这里的`${number}`，而不是`number`

### 4. 检查是否为2的幂数

这个很简单明了，巧妙运用了`与(&)`运算符。

```
const isNumberPowerOfTwo = number => !!number && (number & (number - 1)) === 0;

isNumberPowerOfTwo(100); // false
isNumberPowerOfTwo(128); // true
```

### 5. 创建一级对象的键值对数组

本例子只是针对`一级对象`创建数组，这个数组是二维的，其存储转换后对象的`键值对`。

```
const keyValuePairsToArray = object => Object.keys(object).map(el => [el, object[el]]);

keyValuePairsToArray({ Better: 4, Programming: 2});
// [['Better', 4], ['Programming', 2]]
```

### 6. 返回数字数组中的最大值

下面我们定义了一个函数，参数一是要传递的数字数组，参数二是要返回的数组长度。当然，对于`返回数字数组中的最小值`的思路也是一样。

```
const maxElementsFromArray = (array, len = 1) => [...array].sort((x, y) => y - x).slice(0, len);

maxElementsFromArray([1, 2, 3, 4, 5]); // [5]
maxElementsFromArray([7, 8, 9, 10, 10], 2); // [10, 10]
```

### 7. 判断数组中的元素是否相同

我们的思路是：将数组中第二个开始的元素逐个与第一个元素相比较，使用`===`符号比较噢。

```
const elementsAreEqual = array => array.every(el => el === array[0]);

elementsAreEqual([9, 8, 7, 6, 5]); // false
elementsAreEqual([4, 4, 4, 4, 4]); // true
```

### 8. 计算平均数

我们使用`reduce`函数对数组进行处理，再求平均数。

> 举一反三，计算数的和等也是这种思路

```
const averageOfNumbers = (...numbers) => numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / numbers.length;

averageOfNumbers(...[6, 7, 8]); // 7
averageOfNumbers(6, 7, 8, 9); // 7.5
```

> 🤣 注意：上面的代码并非严谨的，没有考虑到边界值等小问题，感兴趣者可自行扩展，封装成util方法，毕竟在实际开发中使用还是可以的~