//输入一个值返回数据类型

function leixing(x){
    return Object.prototype.toString.call(x).replace(/^\[object (.+)\]$/,'$1')
}
function type(para) {
    return Object.prototype.toString.call(para)
}

// 2、数组去重
function unique1(arr) {
    return [...new Set(arr)]
}

function unique2(arr) {
    var obj = {};
    return arr.filter(ele => {
        if (!obj[ele]) {
            obj[ele] = true;
            return true;
        }
    })
}
// ###### //去除连续的字符串 
function unique3(arr) {
    var result = [];
    arr.forEach(ele => {
        if (result.indexOf(ele) == -1) {
            result.push(ele)
        }
    })
    return result;
}

String.prototype.unique = function () {
    var obj = {},
        str = '',
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}
function uniq(str) {
    return str.replace(/(\w)\1+/g, '$1')
}