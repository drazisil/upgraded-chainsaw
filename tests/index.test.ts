import * as upgradedChainsaw from "../src/index";

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
