# jt_test
Simple test library

## Install

    npm install jt_test

To use the command line tool ***jttest***   then install the package globally

    npm install -g jttest

## Use just requiring the package:

Create a test file similar to below e.g. ***db_tests.js*** and simply run with ***node db_tests***

    const {
        addTwoNumbers,
    } = require("samplemod")

    const {
        addTest,
        testIsEqual,
        runTests,
    } = require("jt_test")

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

    runTests()


You should see output:

    add two numbers - fail: 0 pass: 1

    Tests 1 Failed 0 Passed 1

## Using the command line tool

If you install the package globally you can use the command line tool ***jttest*** to execute all of the test files it can find

It will look for a config file ***jttest.json*** in a folder ***.jttest*** either in the folder the command is executed in or in the home folder where it will determine where your tests are and the prefix used to identify the tests etc.

### Options with defaults are:
    {
      "prefix": "jttest_",       
      "location": "./jttests",
      "ignore": [],  
      "only": [],         
      "premessage": "Test Starting",  
      "prescript": "",
      "postmessage": "Tests Completed",
      "postscript": ""
    }

* prefix
    *  All tests must start with this prefix
* location
    *  The folder where tests are
* ignore
    *  An array of test names not to be executed
* only
    *  Only run the tests in this array (overrides the ignore option)
* premessage
    *  A message displayed at the start of the tests
* prescript
    *  A script to run before the tests run (see note below)
* postmessage
    *  A message to be displayed after the tests have all run
* postscript
    * A script to run after all tests have ran (see note below)

The ignore option is useful if you want to leave some tests out until the code you are testing is ready.

The only option is used when you only want to test one or more tests specifically, the only option overrides any ignore option values.

The pre/postscripts are useful for setting up tests and also doing additional testing, for example in the development of this module itself I need to test both passed and failed tests and so in my tests I wrote the output to a log for each test expected result and then when all of the tests had finished, I processed the log to match against the actual results.

### Example jttest.json

    {
      "prefix": "jttest_",
      "location": "./jttests",
      "ignore": [
        "jttest_notready1",
        "jttest_notready2"
        ],
      "only": [
        ],
      "prescript": "./.jttest/prescript.js",
      "postscript": "./.jttest/postscript.js",
      "postmessage": "You should see the following results:"

  }

Note: you do not need to specify .js extension on the pre/postscripts as this is assumed but you can if you wish

### Methods

#### **Important**
In some of the methods below there is use of **testkey** parameter, this is a reference to the test so that any failures can be tracked by the process. testkey is passed in by the process of running the test e.g.

    addTest('add two numbers',
        (testkey) => {
            const result = addTwoNumbers(2, 4)
            testIsEqual(testkey, result, 6) 
        }
    )

#### Control methods
* **addTest**
  <br>*addTest(description, testfunction)*
  <br>Used to add tests to be executed. The description is displayed to identify the tests and the testfunction is the testcode to be executed.
* **runTests**
  <br>*runTests()*
  <br>Run the tests added
#### Tests
* **testFail**
  <br>*testFail(testkey, reason)*
  <br>Forces a fail result, giving the reason
* **testPass**
  <br>*testPass(testkey)*
  <br>Forces a pass result
* **testIsTrue**
  <br>*testIsTrue(testkey, value, reason)*
  <br>tests the value to be *true*, giving the reason if the test fails as not *true*
* **testIsFalse**
  <br>*testIsFalse(testkey, value, reason)*
  <br>tests the value to be *false*, giving the reason if the test fails as not *false*
* **testIsEqual**
  <br>*testIsEqual(testkey, value1, value2, reason)*
  <br>tests value1 equal to value2, failing with the reason if they are not equal
* **testNotEqual**
  <br>*testNotEqual(testkey, value1, value2, reason)*
  <br>tests value1 not equal to value2, failing with the reason if they are equal
* **testIsInteger**
  <br>*testIsInteger(testkey, value, reason)*
  <br>test the value is a valid integer, failing with the reason if not an integer
* **testIsString**
  <br>*testIsString(testkey, value, reason)*
  <br>test the value is a valid string, failing with the reason if not an string

#### Utility methods
* **makeString**
  <br>*makeString(length)*
  <br>makes a string of random characters of length
* **makeInteger**
  <br>*makeInteger = (max, min)*
  <br>makes an integer between the max and min, if min is left out then it defaults to 0
