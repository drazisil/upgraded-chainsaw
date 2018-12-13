export interface IFileSig {
  signature: Buffer;
  name: string;
}

export const fileSignatures: IFileSig[] = [
  {
    signature: Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e]),
    name: "executable"
  }
];
