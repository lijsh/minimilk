#!/usr/bin/env node
const minimilk = require('.')
const processArgv = '-x 3 -n=5 -abc --ww xx --beep=boop foo --no-bar --baz'.split(' ')

const argv = minimilk(processArgv)
console.log(argv)
