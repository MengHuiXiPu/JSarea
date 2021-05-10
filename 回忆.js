let u = 'https://www.bilibili.com/v/digital/?spm_id_from=333.851.b_7072696d6172794368616e6e656c4d656e75.49'
let m = new URLSearchParams(u)
console.log(m.get('xxx'))

let numlist = [1, 2, 3, 4, 5, 6, 6, 8, 2, 4, 20, 23]
let res = numlist.reduce((a, b) => a + b)
console.log(res)
console.log(Date.now())