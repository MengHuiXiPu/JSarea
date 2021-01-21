// IIFE（自执行函数）
(function(){
        var name="hello";
        var fn1= function(){
            return name;
        }
        //直接在自执行函数里面调用fn2，将fn1作为参数传入
        fn2(fn1);
    })()
    function fn2(f){
        //将函数作为参数传入
        console.log(f());//执行函数，并输出
    }
// 直接在自执行函数里面将封装的函数fn1传给fn2，作为参数调用同样可以获得结果 hello。