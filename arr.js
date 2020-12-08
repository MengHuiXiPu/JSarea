// bad
const items = new Array();

// good
const items = [];


增加
const someStack = [];
// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');


// 复制，单层数组多层数据只能用循环，不能使用浅copy
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];


//伪数组的转换1
const foo = document.querySelectorAll('.foo');
// good
const nodes = Array.from(foo);
// best
const nodes = [...foo];

//伪数组的转换2
const arrLike = {
    0: 'foo',
    1: 'bar',
    2: 'baz',
    length: 3
};
// bad
const arr = Array.prototype.slice.call(arrLike);
// good
const arr = Array.from(arrLike);


// bad
const baz = [...foo].map(bar);
// good
const baz = Array.from(foo, bar);


//数组的遍历
// good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
// good
[1, 2, 3].map((x) => x + 1);
// bad - no returned value means `acc` becomes undefined after the first iteration
[
    [0, 1],
    [2, 3],
    [4, 5]
].reduce((acc, item, index) => {
    const flatten = acc.concat(item);
});
// good
[
    [0, 1],
    [2, 3],
    [4, 5]
].reduce((acc, item, index) => {
    const flatten = acc.concat(item);
    return flatten;
});
// bad
inbox.filter((msg) => {
    const {
        subject,
        author
    } = msg;
    if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
    } else {
        return false;
    }
});
// good
inbox.filter((msg) => {
    const {
        subject,
        author
    } = msg;
    if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
    }

    return false;
});


// bad
const arr = [
    [0, 1],
    [2, 3],
    [4, 5],
];

const objectInArray = [{
    id: 1,
}, {
    id: 2,
}];

const numberInArray = [
    1, 2,
];

// good
const arr = [
    [0, 1],
    [2, 3],
    [4, 5]
];

const objectInArray = [{
        id: 1,
    },
    {
        id: 2,
    },
];
const numberInArray = [
    1,
    2,
];