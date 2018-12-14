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
  const fileContents = await upgradedChainsaw.readBinaryFile("./data/curl-elf");
  expect(fileContents).toBeInstanceOf(Buffer);
});

test("that readBinaryFile throws when unable to read file", async () => {
  await expect(
    upgradedChainsaw.readBinaryFile("./data/not-curl")
  ).rejects.toThrow();
});

test("that getFileSig can identify an executable", async () => {
  await expect(
    upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e])
    )
  ).resolves.toEqual("coff executable");
});

test("that getFileSig can identify a file signature with an extended byte stream", async () => {
  await expect(
    upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e, 0xff, 0x1b])
    )
  ).resolves.toEqual("coff executable");
});

test("that getFileSig throws on unknown file", async () => {
  await expect(
    upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06])
    )
  ).rejects.toThrow();
});

// Intregration tests
describe("Intregration tests", () => {
  test("that we can open an elf binary and correctly identify the file signature", async () => {
    const fileContents = await upgradedChainsaw.readBinaryFile(
      "./data/curl-elf"
    );
    const fileSig = await upgradedChainsaw.getFileSig(
      fileSignatures,
      fileContents
    );
    expect(fileSig).toEqual("elf executable");
  });
});
