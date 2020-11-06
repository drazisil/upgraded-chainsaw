const fs = require("fs");

function hello() {
  return "Hello, new world";
}

function trimArgs(args) {
  return args.slice(2);
}

function usage() {
  return `Error: missing arguments.
    Usage: upgraded-chainsaw <filename>`;
}

function checkArgsLength(args) {
  if (args.length === 0) {
    throw new Error(usage());
  }
  return args;
}

function readBinaryFile(filePath) {
  try {
    return fs.readFileSync(filePath);
  } catch (err) {
    throw new Error(`Error reading ${filePath}: ${err}`);
  }
}

function getFileSig(sigDatabase, byteStream) {
  const result = sigDatabase.find(sig => {
    return sig.signature.equals(byteStream.slice(0, sig.signature.length));
  });

  if (result === undefined) {
    throw new Error(
      `Error reading file signature: unknown: ${byteStream
        .slice(0, 8)
        .toString("hex")}`
    );
  }
  return result.name;
}

module.exports = {
  hello,
  trimArgs,
  usage,
  checkArgsLength,
  readBinaryFile,
  getFileSig,
}
