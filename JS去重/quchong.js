//数组对象去重
const arr1 = [123, "meili", "123", "mogu", 123]
const arr2 = [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]
const arr3 = [123, { a: 1 }, { a: { b: 1 } }, { a: "1" }, { a: { b: 1 } }, "meili"]

const qc = x => {
    let map = new Map()
    x.forEach(e => {
        map.set(JSON.stringify(e), e)
    });
    console.log(map)
    return [...map.values()]
}
console.log(qc(arr1))
console.log(qc(arr2))
console.log(qc(arr3))

