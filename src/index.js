exports.hello = () => {
  return 'Hello, new world'
}

exports.trimArgs = args => {
  return args.slice(2)
}

exports.usage = () => {
  return `Error: missing arguments.
    Usage: upgraded-chainsaw <filename>`
}

exports.checkArgsLength = async args => {
  if (args.length === 0) {
    throw new Error(this.usage())
  }
  return args
}

exports.main = async args => {
  try {
    console.dir(await this.checkArgsLength(this.trimArgs(args)))
    console.log(this.hello())
  } catch (error) {
    console.error(error.message)
  }
}
