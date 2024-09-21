const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(match) {
            var randomNibble = Math.random() * 16 | 0;
            var nibble = (match == 'y') ?
                (randomNibble & 0x3 | 0x8) :
                 randomNibble;
            return nibble.toString(16);
        }
    )
}

const concatArgs = (args) => {
    let msg = ''
    for (var i=0; i<args.length; i++) {
        if (i > 0) {
            msg += ' '
        }
        msg += args[i]
    }
    return(msg)
}

const log = {
    'info': function () {
        const msg = concatArgs(arguments)
        console.log(msg)
    },
    'error': function () {
        const msg = concatArgs(arguments)
        console.log(msg)
    }

}

/*
 * This starts running when library loaded
 * and will terminate the application if
 * the tests do not finish
 *
 */
const processControl = setTimeout( () => {
    log.error('terminating tests as they have ran too long')
    process.exit(0)
}, 5000)

const testend = (testkey) => {
    tests[testkey].run = 0
}

/*
 * test layout
 *
    testname: {
        run: 1,
        desc: 'dbExists should fail',
        test: (testkey) => {
           if...
               testfail(testkey)
           else...
               testpass(testkey)
           testend(testkey)
         })
        },
        result: { fail: 0,
                  pass: 0,
                  errors: []
        }
    }
 *
 */
const tests = {}

const runTest = async (key) => {
    try {
        await tests[key].test(key)
    } catch (e) {
        tests[key].result.fail++
        tests[key].result.errors.push('error with test caught')
    }

    testend(key)
}

const displayResults = () => {
    let totalTests = 0
    let totalFailed = 0
    let totalPassed = 0
    for (let key in tests) {
        log.info(tests[key].desc + ' - fail: ' + tests[key].result.fail + ' pass: ' + tests[key].result.pass)
        totalTests++
        totalFailed+=tests[key].result.fail
        totalPassed+=tests[key].result.pass
        tests[key].result.errors.forEach( (errorMessage) => {
            log.info('\t', errorMessage)
        })
    }
    log.info('\nTests', totalTests, 'Failed', totalFailed, 'Passed', totalPassed)
}

/*
 * The following are the methods that will be exported
 *
 */

const makeString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const makeInteger = (max, min) => {
    if (typeof min === 'undefined') {
        min = 0
    }
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}

const addTest = (desc, test) => {
    const key = uuid()
    tests[key] = { run: 1,
                   desc: desc,
                   test: test,
                   result: {
                       fail: 0,
                       pass: 0,
                       errors: []
                   }
    }
}

const testFail = (testkey, reason) => {
    tests[testkey].result.fail++
    if (typeof reason !== 'undefined') {
        tests[testkey].result.errors.push(reason)
    }
}

const testPass = (testkey) => {
    tests[testkey].result.pass++
}

const testIsTrue = (testkey, value, reason) => {
    if (value) {
        tests[testkey].result.pass++
    } else {
        tests[testkey].result.fail++
        if (typeof reason !== 'undefined') {
            tests[testkey].result.errors.push(reason)
        }
    }
}

const testIsFalse = (testkey, value, reason) => {
    if (value) {
        tests[testkey].result.fail++
        if (typeof reason !== 'undefined') {
            tests[testkey].result.errors.push(reason)
        }
    } else {
        tests[testkey].result.pass++
    }
}

const testIsEqual = (testkey, value1, value2, reason) => {
    if (value1 === value2) {
        tests[testkey].result.pass++
    } else {
        tests[testkey].result.fail++
            tests[testkey].result.errors.push('recieved: ' + value1)
            tests[testkey].result.errors.push('expected: ' + value2)
        if (typeof reason !== 'undefined') {
            tests[testkey].result.errors.push(reason)
        }
    }
}

const testNotEqual = (testkey, value1, value2, reason) => {
    if (value1 === value2) {
        tests[testkey].result.fail++
        if (typeof reason !== 'undefined') {
            tests[testkey].result.errors.push(reason)
        }
    } else {
        tests[testkey].result.pass++
    }
}

const testIsInteger = (testkey, value, reason) => {
    if (Number.isInteger(value)) {
        tests[testkey].result.pass++
    } else {
        tests[testkey].result.fail++
        if (typeof reason !== 'undefined') {
            tests[testkey].result.errors.push(reason)
        }
    }
}

const testIsString = (testkey, value, reason) => {
    if (Object.prototype.toString.call(value) === '[object String]') {
        tests[testkey].result.pass++
    } else {
        tests[testkey].result.fail++
        if (typeof reason !== 'undefined') {
            tests[testkey].result.errors.push(reason)
        }
    }
}

const runTests = () => {
   for (let key in tests) {
       runTest(key)
   }

   /*
    * Wait until all tests run
    *
    */
   let wait = true;
   const waitForResults = () => {
       let alldone = true
       for (let key in tests) {
           if (tests[key].run === 1) {
               alldone = false
           }
       }
       if (alldone) {
          wait = false
          clearTimeout(processControl)
          displayResults()
          return
       }
       setTimeout(waitForResults, 1000)
   }

   if (wait) {
       waitForResults()
   }

}

module.exports = {
        makeString,
        makeInteger,
        addTest,
        testFail,
        testPass,
        testIsTrue,
        testIsFalse,
        testIsEqual,
        testNotEqual,
        testIsInteger,
        testIsString,
        runTests
}

