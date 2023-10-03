function resolveAfterNSeconds(n){
    return new Promise(resolve => {
        setTimeout(() => {resolve("finished")}, 1000*n)
    })
}

async function testAwait(){
    console.log("about to wait")
    const val = await resolveAfterNSeconds(5)
    console.log(`finished the 5 second wait, ${val}`);
}

testAwait()

async function testAwait2(){
    console.log("Test 2 about to wait")
    await resolveAfterNSeconds(2)
    console.log("test 2 finished the 2 second wait")
}

testAwait2()