const lovelaceToAda = (lovelace: bigint | number) => Number(BigInt(lovelace) / 1000000n)

export { lovelaceToAda }
