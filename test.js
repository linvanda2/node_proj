async function foo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('aaaddd')
        }, 3)
    })
}

const t = await foo()
console.log(t)