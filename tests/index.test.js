const tat = require('tap')

const upgradedChainsaw = require("../src/index");
const fileSignatures = require("../src/fileSignatures");
const tap = require('tap');

tap.equals(upgradedChainsaw.hello(), "Hello, new world");

tap.same(upgradedChainsaw.trimArgs(["1", "2", "3", "4"]), ["3", "4"]);

tap.same(upgradedChainsaw.trimArgs(["1"]), []);

tap.same(upgradedChainsaw.trimArgs([]), []);

tap.throws(() => {upgradedChainsaw.checkArgsLength([])}, /Error: missing arguments.\n    Usage: upgraded-chainsaw <filename>/);

tap.same(upgradedChainsaw.checkArgsLength(['foo', 'bar']), ['foo', 'bar'])

tap.type(upgradedChainsaw.readBinaryFile("./data/curl-elf"), Buffer);

tap.throws(() => {upgradedChainsaw.readBinaryFile("./data/not-curl")}, /Error reading \.\/data\/not-curl\: Error\: ENOENT\: no such file or directory, open \'\.\/data\/not-curl\'/);

tap.equals(upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e])
    ), "ar archive");

tap.equals(upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e, 0xff, 0x1b])
    ), "ar archive");

tap.throws(() => {upgradedChainsaw.getFileSig(
      fileSignatures,
      Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06])
    )}, /Error reading file signature: unknown: 00010203040506/);

// Intregration tests
tap.test("Intregration tests", (t) => {
    const fileContents = upgradedChainsaw.readBinaryFile(
      "./data/curl-elf"
    );
    const fileSig = upgradedChainsaw.getFileSig(
      fileSignatures,
      fileContents
    );
    t.equals(fileSig, "elf executable");
    t.end()
  });
