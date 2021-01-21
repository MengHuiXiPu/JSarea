var fn2;
function fn(){
    var name="hello";
    //将函数赋值给fn2
    fn2 = function(){
        return name;
    }
}
fn()//要先执行进行赋值，
console.log(fn2())//执行输出fn2
// 在闭包里面给fn2函数设置值，闭包的形式把name属性记忆下来，执行会输出 hello。