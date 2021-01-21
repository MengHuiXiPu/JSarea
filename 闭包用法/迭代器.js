var arr =['aa','bb','cc'];
function incre(arr){
    var i=0;
    return function(){
        //这个函数每次被执行都返回数组arr中 i下标对应的元素
         return arr[i++] || '数组值已经遍历完';
    }
}
var next = incre(arr);
console.log(next());//aa
console.log(next());//bb
console.log(next());//cc
console.log(next());//数组值已经遍历完