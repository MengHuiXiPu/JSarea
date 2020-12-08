function out() {
    let name = 12
    return function inner() {
        return name++
    }
}
let a = out()
// let b = out()
// let c = out()
console.log(a())
console.log(a())
console.log(a())


for (var i = 0; i < 10; i++) {
    let out = x => () => console.log(x)
    setTimeout(() => );(out(i), 1000)
}