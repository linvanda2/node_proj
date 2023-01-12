async function foo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('aaaddd')
        }, 3000)
    })
}

const t = await foo()
console.log(t)