const {
        addTwoNumbers,
        subtractNumber,
      } = require("../samplemod")

const {
        addTest,
        testPass,
        testIsTrue,
        testIsFalse,
        testIsEqual,
        testNotEqual,
        testIsInteger,
        testIsString,
        runTests,
        makeString,
        makeInteger
      } = require("../../jt_test")

/*
 * testPass
 *
 */

addTest('test force pass will show as a pass',
    (testkey) => {
        testPass(testkey, 'forced pass')
    }
)

/*
 * testIsTrue
 *
 */

addTest('test isTrue',
    (testkey) => {
        testIsTrue(testkey, true)
    }
)

/*
 * testIsFalse
 *
 */

addTest('test isFalse',
    (testkey) => {
        testIsFalse(testkey, false)
    }
)

/*
 * testIsEqual
 *
 */

addTest('add two numbers',
    (testkey) => {
        const result = addTwoNumbers(2, 4)
        testIsEqual(testkey, result, 6)
    }
)

addTest('subtract a number',
    (testkey) => {
        const result = subtractNumber(4, 2)
        testIsEqual(testkey, result, 2)
    }
)

/*
 * testNotEqual
 *
 */

addTest('make sure two values are not equal',
    (testkey) => {
        testNotEqual(testkey, 0, 1)
    }
)

/*
 * testIsInteger
 *
 */

addTest('make sure value is integer',
    (testkey) => {
        testIsInteger(testkey, 1)
    }
)

/*
 * makeInteger
 *
 */

addTest('make sure makeInteger is an integer',
    (testkey) => {
        testIsInteger(testkey, makeInteger(50, 100))
    }
)

/*
 * testIsString
 *
 */

addTest('make sure value is string',
    (testkey) => {
        testIsString(testkey, "hello")
    }
)

/*
 * makeString
 *
 */

addTest('make sure makeString is string',
    (testkey) => {
        testIsString(testkey, makeString(10))
    }
)

runTests()

