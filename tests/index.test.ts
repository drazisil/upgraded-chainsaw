import * as upgradedChainsaw from "../src/index";
import { fileSignatures } from "../src/fileSignatures";

test('that hello() returns "Hello, world"', () => {
  expect(upgradedChainsaw.hello()).toBe("Hello, new world");
});

test("that trimArgs returns a trimmed array", () => {
  expect(upgradedChainsaw.trimArgs(["1", "2", "3", "4"])).toEqual(["3", "4"]);
});

test("that trimArgs can handle an short array", () => {
  expect(upgradedChainsaw.trimArgs(["1"])).toEqual([]);
});

test("that trimArgs can handle an empty array", () => {
  expect(upgradedChainsaw.trimArgs([])).toEqual([]);
});

test("that checkArgsLength throws with no args", async () => {
  await expect(upgradedChainsaw.checkArgsLength([])).rejects.toThrow();
});

test("that readBinaryFile returns a buffer", async () => {
  const fileContents = await upgradedChainsaw.readBinaryFile("./data/curl");
  expect(fileContents).toBeInstanceOf(Buffer);
});

test("that readBinaryFile throws when unable to read file", async () => {
  await expect(
    upgradedChainsaw.readBinaryFile("./data/not-curl")
  ).rejects.toThrow();
});

test("that getFileSig can identify an executable", () => {
  expect(
    upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e])
    )
  ).toEqual("executable");
});

test("that getFileSig can identify a file signature with an extended byte stream", () => {
  expect(
    upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e, 0xff, 0x1b])
    )
  ).toEqual("executable");
});

test('that getFileSig returns "unknown" on unknown file', () => {
  expect(
    upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06])
    )
  ).toEqual("unknown");
});
