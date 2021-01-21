// 3、函数参数

function fn(){
    var name="hello";
    return function callback(){
        return name;
    }
}
var fn1 = fn()//执行函数将返回值（callback函数）赋值给fn1，

function fn2(f){
    //将函数作为参数传入
    console.log(f());//执行函数，并输出
}
fn2(fn1)//执行输出fn2
// 用闭包返回一个函数，把此函数作为另一个函数的参数，在另一个函数里面执行这个函数，最终输出 hello