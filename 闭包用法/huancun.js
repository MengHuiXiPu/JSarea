// 9、缓存

//比如求和操作，如果没有缓存，每次调用都要重复计算，采用缓存已经执行过的去查找，查找到了就直接返回，不需要重新计算

     var fn=(function(){
        var cache={};//缓存对象
        var calc=function(arr){//计算函数
            var sum=0;
            //求和
            for(var i=0;i<arr.length;i++){
                sum+=arr[i];
            }
            return sum;
        }

        return function(){
            var args = Array.prototype.slice.call(arguments,0);//arguments转换成数组
            var key=args.join(",");//将args用逗号连接成字符串
            var result , tSum = cache[key];
            if(tSum){//如果缓存有   
                console.log('从缓存中取：',cache)//打印方便查看
                result = tSum;
            }else{
                //重新计算，并存入缓存同时赋值给result
                result = cache[key]=calc(args);
                console.log('存入缓存：',cache)//打印方便查看
            }
            return result;
        }
     })();
    fn(1,2,3,4,5);
    fn(1,2,3,4,5);
    fn(1,2,3,4,5,6);
    fn(1,2,3,4,5,8);
    fn(1,2,3,4,5,6);
