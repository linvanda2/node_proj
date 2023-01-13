// 用 let 会打印 0、1、2，用 var 打印 3、3、3
// let 会每次循环单独创建变量实例；var 用的是同一个
// 这里不能用 const
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i)
    }, 0)
}

// 注意：函数的类型是 Object，但 typeof func 返回的是 function
// typeof 返回的不一定就是类型
const obj = {}
function f() {}
const s = ''
let n = null
let ud

console.log(typeof obj)// object
console.log(typeof f)// function
console.log(typeof und)// undefined
console.log(typeof s)// string
console.log(typeof n)// object

console.log(ud)// undefined。用它不会报错，因为声明了该变量
// console.log(fff)// 报错。虽然 typeof fff 返回 undefined，但直接用它会报错，因为没有声明

console.log("null == undefined:", null == undefined)// true
console.log("null === undefined:", null === undefined)// false
console.log("string to Boolean:", Boolean(s))// false

// NaN 转成 Boolean 是 false
if (!NaN) {
    console.log("NaN is false")
}

console.log(0.1+0.2)// 0.30000000000000004
const a = 0.1
const b = 0.2
// 浮点数不能直接做精确比较
if (a + b == 0.3) {
    console.log(`${a}+${b} is 0.3`)// 不会走到这里
} else {
    console.log(`${a}+${b} is not 0.3`)
}

let max = Number.MAX_VALUE// js 能表示的最大值
max += max
console.log("max is Infinity:", max == Infinity)// true。超过最大值会变成 Infinity
console.log(`${a} is Finite:`, isFinite(a))// true。isFinite 测试值是否 js 能表示的有限制
console.log(`${max} is Finite:`, isFinite(max))// false

// NaN 和除 0 操作
console.log("NaN == NaN:", NaN == NaN)// false
console.log("NaN is Finite:", isFinite(NaN))// false
// js 中除 0 不会抛异常
console.log("0/0:", 0/0)// NaN
console.log("5/0:", 5/0)// Infinity
console.log("-5/0:", -5/0)// -Infinity
console.log("5/-0:", 5/-0)// -Infinity
// isNaN 用来检测一个值能否转换为合法的数值, isNaN 返回 false 的都可以用 Number() 函数转成合法数值，true 的用 Number() 转换得到 NaN
console.log("isNaN:", isNaN(NaN), isNaN('9'), isNaN('abc'), isNaN(true), isNaN(null), isNaN(''), isNaN(undefined))// true、false、true、false, false, false, true
obj.valueOf = () => {
    return 90;
}
console.log("obj isNaN:", isNaN(obj)) // 对象使用 isNaN，实际是对其 valueOf() 函数返回值进行 isNaN() 判断
console.log("Number(''), parseInt(''):", Number(''), parseInt(''))// 0, NaN

// 字符串
console.log('\u2603')// \unnnn nnnn 表示 Unicode 码点
console.log('length of 中国:', '中国'.length)// 2
console.log("toString:", true.toString(), a.toString(), obj.toString(), NaN.toString())
// console.log("toString:", n.toString(), ud.toString())// 报错。不能在 null 和 undefined 上调 toString()
const n2 = 100
console.log("number toString:", n2.toString(10), n2.toString(8), n2.toString(16))// 在整数上调 toString() 时可以指定底数，转成什么进制对应的字符串