# minimilk
> A CLI argument parser like minimist

This is a zero-config cli argument parser. It exists for learning purpose. Most code is inspired by [`minimist`](https://github.com/substack/minimist).

minimilk don't support alias and `--` right now.

## Usage
First, install the pkg:
```
npm i -S minimilk
```
Then start using it:
``` js
const minimilk = require('minimilk')

const args = '-x 3 -n=5 -ab --ww xx --beep=boop foo --no-bar --baz'.split(' ')

minimilk(args)
// => { _: ['foo'], x: '3', n: '5', a: true, b: true, ww: 'xx', beep: 'boop', bar: false, baz: true }
```