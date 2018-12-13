import * as upgradedChainsaw from "../src/index";

test('that hello() returns "Hello, world"', () => {
  expect(upgradedChainsaw.hello()).toBe("Hello, new world");
});

test("that trimArgs returns a trimmed away", () => {
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

test("that checkArgsLength returns args with with valid arguments", async () => {
  await expect(upgradedChainsaw.checkArgsLength(["1"])).resolves.toEqual(["1"]);
});
