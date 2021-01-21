//每秒执行1次，分别输出1-10
for(var i=1;i<=10;i++){
    (function(j){
        //j来接收
        setTimeout(function(){
            console.log(j);
        },j*1000);
    })(i)//i作为实参传入
}
// 如果不采用闭包的话，会有不一样的情况。

