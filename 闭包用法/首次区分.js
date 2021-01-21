var fn = (function(){
    var arr=[];//用来缓存的数组
        return function(val){
            if(arr.indexOf(val)==-1){//缓存中没有则表示需要执行
                arr.push(val);//将参数push到缓存数组中
                console.log('函数被执行了',arr);
                //这里写想要执行的函数
            }else{
                console.log('此次函数不需要执行');
            }
            console.log('函数调用完打印一下，方便查看已缓存的数组：',arr);
        }
    })();

fn(10);
fn(10);
fn(1000);
fn(200);
fn(1000);