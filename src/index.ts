import * as util from "util";
import * as fs from "fs";
import { IFileSig, fileSignatures } from "./fileSignatures";

const fsReadFile = util.promisify(fs.readFile);

export function hello() {
  return "Hello, new world";
}

export function trimArgs(args: string[]) {
  return args.slice(2);
}

export function usage() {
  return `Error: missing arguments.
    Usage: upgraded-chainsaw <filename>`;
}

export async function checkArgsLength(args: string[]) {
  if (args.length === 0) {
    throw new Error(usage());
  }
  return args;
}

export async function readBinaryFile(filePath: string) {
  try {
    return await fsReadFile(filePath);
  } catch (err) {
    throw new Error(`Error reading ${filePath}: ${err}`);
  }
}

export async function getFileSig(sigDatabase: IFileSig[], byteStream: Buffer) {
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

export async function main(args: string[]) {
  try {
    const cleanedArgs = await checkArgsLength(trimArgs(args));
    const fileContents = await readBinaryFile(cleanedArgs[0]);
    console.log(await getFileSig(fileSignatures, fileContents));
  } catch (error) {
    console.error(error.message);
  }
}
