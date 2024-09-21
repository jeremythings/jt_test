const fs = require("fs")
const path = require("path")


let expectedPath = './.jttest'
const prefix = 'expected_'
let myregex = new RegExp(prefix + ".*\.json$")
let expectedFiles = []
try {
    expectedFiles = fs.readdirSync(expectedPath).filter((allFilesPaths) => allFilesPaths.match(myregex) !== null)
} catch (e) {
    console.log('Error reading expected directory', expectedPath)
    return
}

const expectedResults = {
    tests: 0,
    failed: 0,
    passed: 0
}

for (let i=0; i < expectedFiles.length; i++) {
    const expected = JSON.parse(fs.readFileSync(path.join(expectedPath, expectedFiles[i])))
    expectedResults.tests+= expected.tests
    expectedResults.failed+= expected.failed
    expectedResults.passed+= expected.passed
    fs.unlinkSync(path.join(expectedPath, expectedFiles[i]))
}

console.log("Tests", expectedResults.tests, "Failed", expectedResults.failed, "Passed", expectedResults.passed)
