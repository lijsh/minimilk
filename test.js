#!/usr/bin/env node
const minimilk = require('.')
const processArgv = '-x 3 -n=5 -abc 123e-2 --ww xx --beep=boop foo --no-bar --baz'.split(' ')

const argv = minimilk(processArgv)
console.log(argv)
