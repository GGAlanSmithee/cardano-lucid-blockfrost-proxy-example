const lovelaceToAda = (lovelace: bigint | number) => {
  if (typeof lovelace === "number") lovelace = Math.round(lovelace)

  return Number(BigInt(lovelace) / 1000000n)
}

export { lovelaceToAda }
