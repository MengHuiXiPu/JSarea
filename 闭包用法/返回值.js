//1.返回值 最常用的
function fn() {
    var name = "hello";
    return function () {
        return name;
    }
}
var fnc = fn();
console.log(fnc())//hello
// 这个很好理解就是以闭包的形式将 name 返回。