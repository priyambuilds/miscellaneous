const fs = require("fs");

// function cleanFile(filePath, cb) {fs.readFileSync(filePath, "utf-8", function (err, contents) {
//     const trimmedContents = contents.trim();
//     fs.writeFile("a.txt", trimmedContents, function () {
//         cb();
//     })
// });
// }

// cleanFile("a.txt", function () {
//     console.log("done")
// })

// const trimmedContents = contents.trim();
// fs.writeFileSync("a.txt", trimmedContents)


// cleanFile("a.txt")
//     .then(function () {
    //         console.log("file has been read")
    //     })
    //     .catch(function () {
        //         console.log("error")
        //     })
        
        // async function main() {
            //     try {
                //         await cleanFile("a.txt")
                //     } catch (e) {
                    //         console.log("error while cleaning the file")
                    //     }
                    // }
                    // main()
                    
// async function cleanFile(filePath) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile(filePath, "utf-8", function (err, contents) {
//             if (err) {
//                 reject();
//             } else {
//                 const trimmedContents = contents.trim();
//                 fs.writeFile(filePath, trimmedContents, function (err) {
//                     if (err) {
//                         reject()
//                     } else {
//                         resolve();
//                     }
//                 })
//             }
//         })
//     })
// }
                  
async function cleanFile(filePath) {
    const contents = await fs.readFile(filePath, "utf-8")
    const trimmedContents = contents.trim()
    await fs.writeFile(filePath, trimmedContents)
}

async function cleanManyFiles(prefix) {
    await cleanFile(prefix + "1" + ".txt")
    await cleanFile(prefix + "2" + ".txt")
    await cleanFile(prefix + "3" + ".txt")
}


                    
cleanManyFiles("a")
    .then(function () {
        console.log("all files have been cleaned")
    })
    .catch(function (e) {
        console.log("error", e)
    })

function wait(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("one second has passed")
            resolve()
        }, ms)
    })
}

wait(1000)
    .then(function () {
        console.log("success")
    })
    .catch(function () {
        console.log("an error occured")
    }) 


