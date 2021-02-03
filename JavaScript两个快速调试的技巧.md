## JavaScript两个快速调试的技巧

### console.table展示数据

在控制台上展示数组或对象，使用`console.table`比`console.log`更加直观明了。

```
// 在控制台上运行
console.table([
  { firstName: 'John', lastName: 'Doe', age: 2 },
  { firstName: 'William', lastName: 'Shakespeare', age: 3 }
])
```

展示为一个table表，友好很多：![Image](https://mmbiz.qpic.cn/mmbiz_jpg/zPh0erYjkib1EG7eC8QZaOGR2o0hKXlEcibYXk29Hcyibb2s46bVF3Gmia3AhZJ0dkXGJlIy0Jic0DiabiaVKnm5WgEgA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

当然，你还可以指定展示哪些列~

```
// 在控制台上运行
console.table([
  { firstName: 'John', lastName: 'Doe', age: 2 },
  { firstName: 'William', lastName: 'Shakespeare', age: 3 }
], ['firstName', 'lastName'])
```

上面指定展示`firstName`和`lastName`这两列，当然，`(index)` 是默认有的。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/zPh0erYjkib1EG7eC8QZaOGR2o0hKXlEcDOWR072aUV81fTfIfswiaeR0pgFDa3ZDDVSoz0zJxADibXcy36mcIBCQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)table_column_option

> 注意⚠：语法 console.table(data [, columns]);

### copy复制数据

如果你使用谷歌浏览器并需要复制控制台输出的数据。你可以使用`copy()`命令行，而不是手动高亮选择对应代码进行复制。

```
const data = [2, 3, 4];
copy(data);
```

执行上面的代码，会将`data`数据值复制到你的粘贴板上。你可以在任意文档中进行粘贴。

> 注意⚠：`copy`命令仅在谷歌浏览器控制台上生效，并且在`node.js`环境中无效。