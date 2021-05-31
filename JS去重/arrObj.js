const book = [{
    t: 1,
    n: 'b1'
},
{
    t: 1,
    n: 'b1'

},
{
    t: 2,
    n: 'b2'
},
{
    t: 3,
    n: 'b3'
},
{
    t: 3,
    n: 'b3'
}
]
const jsonObj = book.map(JSON.stringify)
console.log(jsonObj)
let arr1 = [... new Set(jsonObj)]
console.log(arr1)