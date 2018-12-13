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

export async function main(args: String[]) {
  try {
    console.dir(await checkArgsLength(trimArgs(args)));
    console.log(hello());
  } catch (error) {
    console.error(error.message);
  }
}
