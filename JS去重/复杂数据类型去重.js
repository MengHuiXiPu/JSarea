const ty = x => Object.prototype.toString.call(x).replace(/^\[object (.+)\]$/, '$1')

const isEqual = (a, b) => {
    let t1 = ty(a)
    let t2 = ty(b)
    if (t1 !== t2) return false
    if (t1 === 'Array') {
        if (a.length !== b.length) return false
        return a.every((item, i) => {
            return isEqual(a[i], b[i])
        })
    }
    if (t1 === 'Object') {
        let a1 = Object.keys(a)
        let b1 = Object.keys(b)
        if (a1.length !== b1.length) return false
        return a1.every((item, i) => {
            return isEqual(a[item], b[item])
        })
    }
    return a === b
}

const jiance = arr => {
    return arr.reduce((pv, cv) => {
        let index = pv.findIndex(i => isEqual(cv, i))
        if (index === -1) {
            pv.push(cv)
        }
        return pv
    }, [])
}
const arr1 = [123, { a: 1 }, { a: { b: 1 } }, { a: "1" }, { a: { b: 1 } }, "meili", { a: 1, b: 2 }, { b: 2, a: 1 }]
console.log(jiance(arr1))