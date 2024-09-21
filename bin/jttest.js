#!/usr/bin/env node

const { existsSync, readFileSync, readdirSync } = require('node:fs')
const path = require('path')
const { homedir } = require('os')
const { exec, execSync } = require("child_process")

let settings = {
    "prefix": "jttest_",
    "location": "./jttests",
    "ignore": [
        ],
    "only": [
        ],
    "premessage": "Test Starting",
    "prescript": "",
    "postmessage": "Tests Completed",
    "postscript": ""
}

// last line Tests 17 Failed 8 Passed 9
let results = {
    "tests": 0,
    "failed": 0,
    "passed": 0
}

const homePath = path.join(homedir(), '.jttest' ,'jttest.json')
if (existsSync(homePath)) {
    const homeSettings = JSON.parse(readFileSync(homePath, 'utf8'))
    settings = { ...settings, ...homeSettings }
}

const localPath = path.join(process.cwd(), '.jttest', 'jttest.json')
if (existsSync(localPath)) {
    const localSettings = JSON.parse(readFileSync(localPath, 'utf8'))
    settings = { ...settings, ...localSettings }
}

console.log(settings.premessage)

const runPrePostFile = (filePath) => {
    try {
      let res = execSync("node " + filePath)
       console.log(res.toString())
    }
    catch (err){
      console.log('Cannot execute pre/post script', settings.prescript)
    }
}

if (settings.prescript !== "") {
    const filePath = settings.prescript
    runPrePostFile(filePath)
}

let testpath = settings.location
let myregex = new RegExp(settings.prefix + ".*\.js$")
let testfilesAll = []
let testfiles = []
try {
    testfilesAll = readdirSync(testpath).filter((allFilesPaths) => allFilesPaths.match(myregex) !== null)
} catch (e) {
    console.log('Error reading test directory', testpath)
    return
}


if (settings.only.length > 0) {
    for (let i = 0; i < testfilesAll.length; i++) {
        if (settings.only.includes(testfilesAll[i])) {
            testfiles.push(testfilesAll[i])
            console.log('settings only include', testfilesAll[i])
        }
    }
} else {
    for (let i = 0; i < testfilesAll.length; i++) {
        if (!(settings.ignore.includes(testfilesAll[i]))) {
            testfiles.push(testfilesAll[i])
            console.log('including', testfilesAll[i])
        } else {
            console.log('settings ignore include', testfilesAll[i])
        }
    }
}

let testFileCount = testfiles.length

if (testFileCount === 0) {
    console.log('No test files found with prefix', settings.prefix, 'in folder', settings.location)
    return
}

const runTestFile = (filename) => {
    const filePath = path.join(settings.location, filename)
    exec("node " + filePath, (error, stdout, stderr) => {
        console.log('Test:', filePath)
        console.log("=".repeat(6 + filePath.length))
        console.log(stdout)
        if (stderr) {
            console.log(stderr)
        }
        try {
            const lastline = stdout.match(/(.*)\s*$/)[1]
            const thisResults = lastline.match(/^Tests\s(.*)\sFailed(.*)\sPassed(.*)$/)
            results.tests+= parseInt(thisResults[1],10)
            results.failed+= parseInt(thisResults[2],10)
            results.passed+= parseInt(thisResults[3],10)
        } catch(e) {
            console.log("Error running test", filePath)
        }
        testFileCount--
    });
}

for (let i = 0; i < testfiles.length; i++) {
    runTestFile(testfiles[i])
}

let wait = true;
const waitForResults = () => {
    let alldone = false
    if (testFileCount === 0) {
        alldone = true
    }
    if (alldone) {
       wait = false
       console.log("Final results")
       console.log("Tests", results.tests, "Failed", results.failed, "Passed", results.passed)
       console.log(settings.postmessage)
       if (settings.postscript !== "") {
           const filePath = settings.postscript
           runPrePostFile(filePath)
       }
       return
    }
    setTimeout(waitForResults, 1000)
}

if (wait) {
    waitForResults()
}

