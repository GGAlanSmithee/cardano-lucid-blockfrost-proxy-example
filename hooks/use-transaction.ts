import { Lucid } from 'lucid-cardano';
import { useCallback, useState } from 'react';

const useTransactionSender = (lucid?: Lucid) => {
  const [lovelace, setLovelace] = useState(0)
  const [toAccount, setToAccount] = useState("")

  const sendTransaction = useCallback(async () => {
    if (!lucid || !toAccount || !lovelace) return

    const tx = await lucid
      .newTx()
      .payToAddress(toAccount, { lovelace: BigInt(lovelace) })
      .complete()

    const signedTx = await tx.sign().complete()

    const txHash = await signedTx.submit()

    console.log(txHash)
  }, [lucid, toAccount, lovelace])

  return {
    lovelace,
    setLovelace,
    toAccount,
    setToAccount,
    sendTransaction,
  }
}

export { useTransactionSender }
