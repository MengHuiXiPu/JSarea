let fb = function (n) {
    return n === 1 ? 1 : arguments.callee(n - 1) + n
}
console.log(fb(10))