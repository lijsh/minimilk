module.exports = args => {
  const argv = { _: [] }
  let i = 0
  while (i < args.length) {
    const arg = args[i]
    // process '--foo=bar' type arg
    if (/^--.+=/.test(arg)) {
      const m = arg.match(/^--([^=]+)=([\s\S]*)$/);
      const [_, key, value] = m
      argv[key] = value
    } else if (/^--no-.+/.test(arg)) { // process '--no-foo' type arg
      const key = arg.match(/^--no-(.+)/)[1]
      argv[key] = false
    } else if (/^--.+/.test(arg)) { // process '--foo' 及 '--foo bar' type arg
      const key = arg.match(/^--(.+)/)[1]
      const next = args[i + 1]
      if (next && !/^-/.test(next)) {
        argv[key] = next
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
          argv[letter] = next.split('=')[1]
          end = true
          break
        }

        if (/[a-zA-Z]/.test(letter)
        && /-?\d+(\.\d*)?(e-?\d+)?/.test(next)) {
          argv[letter] = next
          end = true
          break
        }

        if (letters[j + 1] && letters[j + 1].match(/\W/)) {
          argv[letter] = arg.slice(j + 2)
          end = true
          break
        }

        argv[letter] = true
        j++
      }

      const key = arg.split('').pop()
      if (!end) {
        if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1])) {
          argv[key] = args[i + 1]
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