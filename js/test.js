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

console.log("Number('1a')=", Number('1a'))// NaN。注意：一些语言中该字符串转'1a'成数值是1，但 js 中是 NaN

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
obj.toString = () => {
    return 'I am obj'
}
console.log("obj isNaN:", isNaN(obj)) // 对象使用 isNaN，实际是对其 valueOf() 函数返回值进行 isNaN() 判断
console.log("Number(''), parseInt(''):", Number(''), parseInt(''))// 0, NaN

// 字符串
console.log('\u2603')// \unnnn nnnn 表示 Unicode 码点
console.log('length of 中国:', '中国'.length)// 2
// 绝大多数的类型都有 toString() 方法，除了 Null 和 Undefined
console.log("toString:", true.toString(), a.toString(), obj.toString(), NaN.toString())
// console.log("toString:", n.toString(), ud.toString())// 报错。不能在 null 和 undefined 上调 toString()
const n2 = 100
console.log("number toString:", n2.toString(10), n2.toString(8), n2.toString(16))// 在整数上调 toString() 时可以指定底数，转成什么进制对应的字符串
console.log("String(null):", String(null))// "null"
console.log("String(undefined):", String(undefined))// "undefined"
console.log(`obj is ${ obj }`)// 对象插值会调对象的 toString() 方法

// 模板字面量与标签函数
function tagFunc(strings, ...expressions) {
    console.log(strings)
    console.log(expressions)

    return 'foobar'
}
function defaultTagFunc(strings, ...expressions) {
    return strings[0] + expressions.map((val, idx) => {
        return val + strings[idx + 1]
    }).join('')
}
const name = '张三'
const age = 20
const sex = '男'
const str = tagFunc`name:${ name }, age:${ age }, sex:${ sex }`
console.log(str)// foobar
const str2 = defaultTagFunc`name:${ name }, age:${ age }, sex:${ sex }`
console.log(str2)// name:张三, age:20, sex:男
// String.raw 标签函数
console.log(`\u00A9`)// 打印：版权符号
console.log(String.raw`\u00A9`)// 打印：\u00A9
console.log(`one\ntwo`)// 打印：one(换行)two
console.log(String.raw`one\ntwo`)// one\ntwo

// Symbol
const s1 = Symbol()
const s2 = Symbol()
const s5 = Symbol('s5')
console.log("s1==s2:", s1 == s2)// false
// Symbol.for 针对相同字符串会返回同一个 Symbol（全局注册表）
const s3 = Symbol.for('foo')
const s4 = Symbol.for('foo')
console.log("s3===s4:", s3 === s4)// true
console.log("key for Symbol:", Symbol.keyFor(s1), Symbol.keyFor(s3))// undefined,foo
// 使用符号作为属性
const o = {
    name: 'linvanda',
    _age:0,
    [s1]: 'foo'
}
o[s2] = 'bar'
Object.defineProperty(o, s5, { value: 'foobar' })
console.log("o is:", o)// { name: 'linvanda', [Symbol()]: 'foo', [Symbol()]: 'bar' }
console.log(Reflect.ownKeys(o))// [ 'name', Symbol(), Symbol(), Symbol(s5) ]
console.log(Object.getOwnPropertyNames(o))// [ 'name' ]
console.log(Object.getOwnPropertySymbols(o))// [ Symbol(), Symbol(), Symbol(s5) ]
console.log(Object.getOwnPropertyDescriptors(o))

Object.defineProperty(o, "age", { get() {console.log('get age');return this._age;}, set(val) {console.log('set age');this._age=val;} })
o.age = 19
console.log("o.age:", o.age)

// instanceof 操作符 和内置符号 Symbol.hasInstance
class Foo {}
const foo = new Foo()
console.log("foo instanceof Foo:", foo instanceof Foo)// true
function Bar() {}
const bar = new Bar()
console.log("bar instanceof Bar:", bar instanceof Bar)// true
console.log("Foo hasInstance foo:", Foo[Symbol.hasInstance](foo))// true。instanceof 操作符内部就是掉类/函数的该符号属性
class Fooz extends Foo {}
const fooz = new Fooz()
console.log("fooz instanceof Foo:", fooz instanceof Foo)// true
class Foof extends Foo {
    // 重写静态方法 Symbol.hasInstance
    static [Symbol.hasInstance](o) {
        return false
    }
}
const foof = new Foof()
console.log("foof instanceof Foo:", foof instanceof Foof)// false。该操作实际是调 Foof[Symbol.hasInstance](foof)，Foof 重写了该符号属性让其永远返回 false

// 迭代和内置符号 Symbol.iterator
const arr = [10, 20, 30]
// for of 内部是调 arr[Symbol.iterator]() 获取迭代器
for (const val of arr) {
    console.log("arr val:", val)// 10, 20, 30
}
// 重写迭代器的行为
arr[Symbol.iterator] = function () {
    const $this = this
    let idx = 0

    return {
        next() {
            if (idx < $this.length) {
                return { value: $this[idx++] + 100, done: false }
            } else {
                // 迭代结束了
                return { value: undefined, done: true }
            }
        }
    }
}
for (const val2 of arr) {
    console.log("arr val2:", val2)// 110, 120, 130
}

// 类数组对象
// 和数组一样可以通过下标访问，也有 length 属性
const arrLike = {
    0: 'foo',
    1: 'bar',
    length: 2
}
console.log("arrLike info:", arrLike[0], arrLike.length)

// 类数组对象不可以用 for of 迭代
// for (const v of arrLike) {
//     console.log("arrLike v:", v)
// }

// arrLike.push('fooz') // 类数组对象不具备数组的方法如 push

// 我们可以自己给类数组对象添加迭代器
arrLike[Symbol.iterator] = function () {
    const $this = this
    let index = 0

    return {
        next() {
            if (index < $this.length) {
                return { value: $this[index++], done: false }
            } else {
                return { value: undefined, done: true }
            }
        }
    }
}
// 现在可以迭代类数组对象了
for (const v2 of arrLike) {
    console.log("arrLike v2:", v2)
}

// Array.prototype.concat 和内置符号属性 Symbol.isConcatSpreadable
console.log("arr.concat(arrLike):", arr.concat(arrLike))// 数组 concat 类数组对象的默认行为是将类数组对象 append 到数组后面
// 该行为可以通过将符号属性 Symbol.isConcatSpreadable 设置为 true，变成打平到前面的数组中
arrLike[Symbol.isConcatSpreadable] = true
console.log("arr.concat(arrLike):", arr.concat(arrLike))// 现在 arrLike 的值被打平放入 arr 中，得到 [ 10, 20, 30, 'foo', 'bar' ]

// String.prototype.match() 和 Symbol.match 符号
console.log(RegExp.prototype[Symbol.match])// 所有的正则表达式实例都有 [Symbol.match] 方法
console.log('"foobar".includes("bar"):', "foobar".includes("bar"))// true
const mstr = "foobar"
// mstr.match(/bar/) 内部是调 /bar/[Symbol.match](mstr)
console.log("mstr.match(/bar/):", mstr.match(/bar/))// [ 'bar', index: 3, input: 'foobar', groups: undefined ]
// 可以给非 RegExp 对象添加 [Symbol.match] 方法，让其可以作为 String.prototype.match() 的参数
class StringMatcher {
    constructor(matchStr) {
        this.matchStr = matchStr
    }

    [Symbol.match](str) {
        // 这里的返回值决定了 String.prototype.match() 返回什么
        return str.includes(this.matchStr)
    }
}
const strM = new StringMatcher('bar')
console.log("mstr.match(strM):", mstr.match(strM))// 打印 true。

const num1 = 9
const num2 = -9
// 十进制转二进制字符串
console.log("num1.toString(2):", num1.toString(2))// 1001
console.log("num2.toString(2):", num2.toString(2))// -1001

console.log("7**2=", 7**2)// 指数操作符。ES7 新增，等同于 Math.pow(7, 2)

console.log("Infinity + -Infinity = ", Infinity + -Infinity)// NaN
console.log("null+undefined=", null+undefined)// NaN
console.log("5+'5'=", 5+'5')// 55，只要有一个是字符串，则执行字符串拼接
console.log("obj+obj=", obj+obj)// 180。对象相加，如果对象有 valueOf，则取 valueOf 的值执行加法，否则如果对象有 toString() 则执行字符串拼接

console.log("5-true=", 5-true)// 4。先将 true 执行 Number(true) 得 1
console.log("5-null=", 5-null)// 5。同上
console.log("obj-10=", obj-10)// 80。执行 obj.valueOf() 得到值。如果没有 valueOf()，则执行 toString() 然后用 Number() 转

console.log("5>'a'?", 5>'a')// false。该运算会执行 Number('a') 得到 NaN，5>NaN 为 false
console.log("'B'>'a'", 'B'>'a')// false。字符串比较实际上是逐个比较字符的编码值。大写字符的编码值都小于小写字符的

// 逗号操作符
const comma = (3,2,4,5,6)
console.log("comma=", comma)// 6

// for in 用来枚举对象中非符号键属性
const obj2 = { a: 'aa', b: 'bb', c: 'cc' }
for (const k in obj2) {
    console.log("k:", k, ";v:", obj2[k])
}

// for of 用来遍历可迭代对象的元素
for (const e of [2,3,4]) {
    console.log("for of ele:", e)
}

// 原始值和引用值
const str3 = "hello"
const str4 = new String("hello")
str3.age = 34
str4.age = 34
console.log("str3.age=", str3.age)// undefined。str3 是原始值，不能给原始值添加动态属性
console.log("str4.age=", str4.age)// 34。str4 是引用值，可以添加动态属性
console.log("typeof str3:", typeof str3)// string，原始值
console.log("typeof str4:", typeof str4)// object，引用值
console.log("str4 instanceof String?", str4 instanceof String)// 对引用值要用 instanceof 检测其具体类型，如果用 typeof 则都返回 object
// 数组是引用值
const aaa = [1]
console.log("typeof aaa:", typeof aaa)// object，说明是引用值
const bbb = aaa// 遵循引用值的复制规则：复制指针
aaa[0] = 444
console.log("bbb[0]=", bbb[0])// aaa 和 bbb 指向的是同一个内存区域的值，所以改 aaa，bbb 的值也变了
// js 中函数参数都是按值传递（也就是说函数的参数实际都是局部变量，将实参变量的值复制过来了
// 如果实参是原始值，则按原始值规则复制（复制值本身）
// 如果实参是引用值，则按引用值规则复制（复制的是指针）
function changeArr(arr) {
    // 数组 arr 是引用值，这里的修改操作会影响外面变量的值
    // 所以不要做这种操作
    arr[0] = 100
}
changeArr(aaa)// aaa[0] 变成 100
console.log("aaa[0] after changeArr:", aaa[0])// 100
console.log("bbb[0] after changeArr:", bbb[0])// 100。因为 bbb 和 aaa 指向的是同一个内存区域

// 变量声明
// 在使用 var 声明变量时，变量会被自动添加到最接近的上下文。在函数中，最接近的上下文就是函
// 数的局部上下文。在 with 语句中，最接近的上下文也是函数上下文。如果变量未经声明就被初始化了，
// 那么它就会自动被添加到全局上下文

// 该函数的上级作用域是全局作用域
function funcvarcccc() {
    // console.log("thevar in funcvarcccc:", thevar)// 报错，找不到变量
}
function funcvar() {
    var thevar = 4// var 声明的变量，添加到最近的上下文（函数上下文中）
    thevar2 = 5// 没有声明就初始化，添加到全局上下文中

    // 该函数的上级作用域是 funcvar
    function bbbb() {
        console.log("thevar in bbbb:", thevar)// 4
    }
    bbbb()
    funcvarcccc()

    with(aaa) {
        var thevar3 = 6// with 中的 var 变量被添加到最近的函数上下文中
    }

    console.log("thevar3 in func:", thevar3)// 6
}
funcvar()
// console.log("thevar:", thevar)// 报错：thevar 是在 funcvar 中声明的函数局部上下文中的变量，这里无法访问
// console.log("thevar3 out of func:", thevar3)// 报错
console.log("thevar2:", thevar2)// 5。thevar2 在全局上下文中

// var 变量的提升
// var 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升”
function hoisting() {
    console.log("var hst:", hst)// undefined 而不是报错
    var hst = 'aaa'

    // 根据 var 变量声明的提升，上面代码等价于
    // var hst
    // console.log("var hst:", hst)
    // hst = 'aaa'
}
hoisting()

// let 声明的变量是块级的，块级作用域由最近的一对包含花括号{}界定。
function blockfunc() {
    if (true) {
        let bla = 4
    }
    // console.log("bla:", bla)// 报错，变量未定义

    {
        let blb = 5
    }
    // console.log("blb:", blb)// 报错，变量未定义

    // 重复 var 声明不会报错（忽略后面的）
    var aaa = 1
    var aaa = 2

    {
        // 重复 let 声明会报错
        // let bbbb = 1
        // let bbbb = 2
    }

    // var 声明的会泄漏到循环外部（函数作用域）
    for (var i = 0; i < 10; ++i) {} 
    console.log(i); // 10

    for (let j = 0; j < 10; ++j) {} 
    // console.log(j); // ReferenceError: j 没有定义
}
blockfunc()

// const
// 开发实践：如果确定变量未来不会被重新赋值，则优先用 const
function constfunc() {
    const a = {}
    // a = {}// 报错，不能重新赋值
    a.name = 'san'// 但修改对象属性（即 const 限制的是变量本身的值不能被修改，但不限制指针指向的内存区域的值）

    // 如果要限制变量指向的对象也不能修改，则要用 Object.freeze
    const b = Object.freeze({})
    b.name = 'si'// 不会报错，但该赋值无效
    console.log("b in constfunc:", b)// 仍然是 {}
}
constfunc()

// 原始值包装类型
const ss1 = 'hello word'
const ss2 = ss1.substring(2)// 原始类型是没有属性和方法的，但这里调用了方法，实际上后天创建了临时的包装引用类型实例
// 其中 ss1.substring(2) 后台会临时创建字符串的包装引用类型 String 实例，相当于：
// const ss1 = new String('hello word')
// const ss2 = ss1.substring(2)
// ss1 = null

// Object 作为工厂方法，会根据传入的原始类型创建对应的包装类型实例
const strobj = new Object("hello")
console.log("strobj instanceof String:", strobj instanceof String)// true

// 数组的创建
function createArrayFunc() {
    const arr1 = new Array()
    const arr2 = new Array(4)// 创建大小为 4 的数组
    const arr3 = new Array("one", "two")// 创建包含两个元素的数组
    const arr4 = ['one', 'two']// 数组字面量创建数组。不会掉 Array 构造函数（类似对象字面量）

    // 通过 Array.from() 创建数组
    const arr5 = Array.from("hello")// ['h', 'e', 'l', 'l', 'o'] 字符串转字符数组
    const arr6 = Array.from(arr4)// 数组浅复制

    const arrLike = {
        0: 'one',
        1: 'two',
        length: 2
    }
    const arr7 = Array.from(arrLike)// ['one', 'two']。从类数组对象创建数组
    const arr8 = Array.from("hello", e => e.toUpperCase())// 转大写,[ 'H', 'E', 'L', 'L', 'O' ]

    function argfunc() {
        console.log("arguments to array:", Array.from(arguments))
    }
    argfunc('hello', 'world')

    // 判断是否数组
    // 不用 instanceof Array，因为在多个全局上下文环境会出问题
    console.log("arr8 is Array:", Array.isArray(arr8))
}
createArrayFunc()

function arrayUseFunc() {
    const arr = ['one', 'two', 'taa']

    const arr2 = Array.from(arr.keys())// 键
    const arr3 = Array.from(arr.values())// 值
    const arr4 = Array.from(arr.entries())// 键值对

    // 堆栈
    arr.push('nihao')// 末尾插入元素
    const e = arr.pop()// 取最后一项
    arr.unshift("haha")// 开头插入元素
    const e2 = arr.shift()// 取第一项

    // 排序
    arr.reverse()// 反转元素
    arr.sort()// 排序。默认升序
    console.log("arr after sort:", arr)

    const arr5 = [0, 1, 5, 10, 15]
    // 注意：sort 排序会将元素执行 String 转换，对于数值，可能得到的不是我们想要的结果
    arr5.sort()
    console.log("arr5 after sort:", arr5)// [ 0, 1, 10, 15, 5 ]
    // 此时需要自定义排序函数
    arr5.sort((x, y) => x - y)
    console.log("arr5 after sort2:", arr5)
}
arrayUseFunc()

