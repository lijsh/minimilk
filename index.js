const isNumber = value => {
  if (typeof value === 'number') return true
  if (/^0x[0-9a-f]+$/i.test(value)) return true
  return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(value)
}

const setArg = (key, val, obj) => {
  const value = isNumber(val) ? Number(val) : val
  obj[key] = value
}

module.exports = args => {
  const argv = { _: [] }
  let i = 0
  while (i < args.length) {
    const arg = args[i]
    // process '--foo=bar' type arg
    if (/^--.+=/.test(arg)) {
      const m = arg.match(/^--([^=]+)=([\s\S]*)$/);
      const [_, key, value] = m
      setArg(key, value, argv)
    } else if (/^--no-.+/.test(arg)) { // process '--no-foo' type arg
      const key = arg.match(/^--no-(.+)/)[1]
      argv[key] = false
    } else if (/^--.+/.test(arg)) { // process '--foo' and '--foo bar' type arg
      const key = arg.match(/^--(.+)/)[1]
      const next = args[i + 1]
      if (next && !/^-/.test(next)) {
        setArg(key, next, argv)
        i++
      } else {
        argv[key] = true
      }
    } else if (/^-[^-]+/.test(arg)) {
      const letters = arg.slice(1, -1).split('')
      let end = false
      let j = 0
      while (j < letters.length) {
        const letter = letters[j]
        const next = arg.slice(j + 2)

        if (/[a-zA-Z]/.test(letter) && /=/.test(next)) {
          setArg(letter, next.split('=')[1], argv)
          end = true
          break
        }

        if (/[a-zA-Z]/.test(letter)
        && /-?\d+(\.\d*)?(e-?\d+)?/.test(next)) {
          setArg(letter, next, argv)
          end = true
          break
        }

        if (letters[j + 1] && letters[j + 1].match(/\W/)) {
          setArg(letter, arg.slice(j + 2), argv)
          end = true
          break
        }

        argv[letter] = true
        j++
      }

      const key = arg.split('').pop()
      if (!end) {
        if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1])) {
          setArg(key, args[i + 1], argv)
          i++
        } else {
          argv[key] = true
        }
      }
    } else {
      argv._.push(arg)
    }
    i++
  }
  return argv
}