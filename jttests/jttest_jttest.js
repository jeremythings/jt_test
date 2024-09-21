/*
 * NOTE:
 * This is testing the test library and should not be used as an example
 *
 * If you want to see an example then look in the example folder
 *
 *
 */

const {
        addTest,                    // not tested
        testFail,                   // not tested
        testPass,                   // not tested
        testIsTrue,                 // not tested
        testIsFalse,                // not tested
        testIsEqual,                // not tested
        testNotEqual,               // not tested
        testIsInteger,              // not tested
        testIsString,               // not tested
        runTests,                   // not tested
        makeString,                 // not tested
        makeInteger                 // not tested
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

/*
 * testFail
 *
 */

addTest('test force fail will show as a fail',
    (testkey) => {
        markTest(false)
        testFail(testkey, 'forced fail')
    }
)

/*
 * testPass
 *
 */

addTest('test force pass will show as a pass',
    (testkey) => {
        markTest(true)
        testPass(testkey, 'forced pass')
    }
)

/*
 * testIsTrue
 *
 */

addTest('test isTrue',
    (testkey) => {
        markTest(true)
        testIsTrue(testkey, true)
    }
)

/*
 * testIsFalse
 *
 */

addTest('test isFalse',
    (testkey) => {
        markTest(true)
        testIsFalse(testkey, false)
    }
)

/*
 * testIsEqual
 *
 */

addTest('testIsEqual',
    (testkey) => {
        markTest(true)
        testIsEqual(testkey, 6, 6)
    }
)

addTest('testIsEqual should fail',
    (testkey) => {
        markTest(false)
        testIsEqual(testkey, 6, 7)
    }
)

/*
 * testNotEqual
 *
 */

addTest('make sure two values are not equal',
    (testkey) => {
        markTest(true)
        testNotEqual(testkey, 0, 1)
    }
)

/*
 * testIsInteger
 *
 */

addTest('testIsInteger',
    (testkey) => {
        markTest(true)
        testIsInteger(testkey, 1)
    }
)

/*
 * makeInteger
 *
 */

addTest('make sure makeInteger is an integer',
    (testkey) => {
        markTest(true)
        testIsInteger(testkey, makeInteger(50, 100))
    }
)

addTest('make sure makeInteger is not a String',
    (testkey) => {
        markTest(false)
        testIsString(testkey, makeInteger(50, 100))
    }
)

addTest('make sure makeInteger call is valid',
    (testkey) => {
        markTest(false)
        testIsString(testkey, makeInteger(50))
    }
)

/*
 * testIsString
 *
 */

addTest('make sure value is string',
    (testkey) => {
        markTest(true)
        testIsString(testkey, "hello")
    }
)

/*
 * makeString
 *
 */

addTest('make sure makeString is string',
    (testkey) => {
        markTest(true)
        testIsString(testkey, makeString(10))
    }
)

addTest('make sure makeString is not an integer',
    (testkey) => {
        markTest(false)
        testIsInteger(testkey, makeString(10))
    }
)

addTest('make sure makeString call is valid',
    (testkey) => {
        markTest(false)
        testIsInteger(testkey, makeString())
    }
)

/*
 * testNotExistingMethod
 *
 */

addTest('test a module that has not been imported',
    (testkey) => {
        markTest(false)
        testNotExist(testkey, 0, 1)
    }
)

/*
 * testNotExistingMethod
 *
 */

addTest('test a module that has been imported but not in module',
    (testkey) => {
        markTest(false)
        testNotExistInModule(testkey, 0, 1)
    }
)

runTests()

