// 6、getter和setter

function fn(){
        var name='hello'
        setName=function(n){
            name = n;
        }
        getName=function(){
            return name;
        }

        //将setName，getName作为对象的属性返回
        return {
            setName:setName,
            getName:getName
        }
    }
    var fn1 = fn();//返回对象，属性setName和getName是两个函数
    console.log(fn1.getName());//getter
        fn1.setName('world');//setter修改闭包里面的name
    console.log(fn1.getName());//getter
// 第一次输出 hello 用setter以后再输出 world ，这样做可以封装成公共方法，防止不想暴露的属性和函数暴露在外部。