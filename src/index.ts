import * as fs from "fs";
import { IFileSig, fileSignatures } from "../src/fileSignatures";
export function hello() {
  return "Hello, new world";
}

export function trimArgs(args: String[]) {
  return args.slice(2);
}

export function usage() {
  return `Error: missing arguments.
    Usage: upgraded-chainsaw <filename>`;
}

export async function checkArgsLength(args: String[]) {
  if (args.length === 0) {
    throw new Error(usage());
  }
  return args;
}

export async function readBinaryFile(filePath: string) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, (err, contents) => {
      if (err) {
        reject(new Error(`Error reading ${filePath}: ${err}`));
      }
      resolve(contents);
    });
  });
}

export function getFileSig(sigDatabase: IFileSig[], byteStream: Buffer) {
  const result = sigDatabase.find(sig => {
    return sig.signature.equals(byteStream.slice(0, sig.signature.length));
  });

  if (result === undefined) {
    return "unknown";
  }
  return result.name;
}

export async function main(args: String[]) {
  try {
    console.dir(await checkArgsLength(trimArgs(args)));
    console.log(hello());
  } catch (error) {
    console.error(error.message);
  }
}
