const {
        addTest,                    // not tested
        // testFail,                   // not tested
        testPass,                   // not tested
        // testIsTrue,                 // not tested
        // testIsFalse,                // not tested
        // testIsEqual,                // not tested
        // testNotEqual,               // not tested
        // testIsInteger,              // not tested
        // testIsString,               // not tested
        runTests,                   // not tested
        // makeString,                 // not tested
        // makeInteger                 // not tested
      } = require("../jt_test")

const fs = require("fs")
const path = require("path")

let expected = {
    tests: 0,
    failed: 0,
    passed: 0
}

const markTest = (expectedPass) => {
    expected.tests++
    if (expectedPass) {
        expected.passed++
    } else {
        expected.failed++
    }
    var scriptName = path.basename(__filename, ".js");
    fs.writeFileSync(path.join("./.jttest", "expected_" + scriptName + ".json"), JSON.stringify(expected))
}

addTest('test force pass will show as a pass',
    (testkey) => {
        markTest(true)
        testPass(testkey, 'forced pass')
    }
)

addTest('testIsQequal',
    (testkey) => {
        markTest(false)
        testIsQequal(testkey, 6, 6)
    }
)

runTests()
