//如何判断urlz中止包含qq.com

const check = function (x) {
    let res = /^http?:\/\/.qq.com[^.]*$/.test(x)
    return res
}

check('http://www.qq.com')
// true

check('http://www.qq.com.cn')
// false

check('http://www.qq.com/a/b')
// true

check('http://www.qq.com?a=1')
// true

check('http://www.123qq.com?a=1')
// false

check('http://www.baidu.com?redirect=http://www.qq.com/a')