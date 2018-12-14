export interface IFileSig {
  signature: Buffer;
  name: string;
}

export const fileSignatures: IFileSig[] = [
  {
    signature: Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e]),
    name: "coff executable"
  },
  {
    signature: Buffer.from([0xcf, 0xfa, 0xed, 0xfe]),
    name: "mac executable"
  },
  {
    signature: Buffer.from([0x7f, 0x45, 0x4c, 0x46]),
    name: "elf executable"
  },
  {
    signature: Buffer.from([0x4d, 0x5a]),
    name: "dos mz executable"
  }
];
