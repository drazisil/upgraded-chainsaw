exports.hello = () => {
  return 'Hello, new world'
}

exports.main = () => {
  console.log(this.hello())
}
