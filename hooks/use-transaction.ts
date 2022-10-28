import { Lucid } from 'lucid-cardano';
import { useCallback, useState } from 'react';

const useTransactionSender = (lucid?: Lucid) => {
  const [error, setError] = useState<Error | undefined>()
  const [lovelace, setLovelace] = useState(0)
  const [toAccount, setToAccount] = useState("")

  const sendTransaction = useCallback(async () => {
    if (!lucid || !toAccount || !lovelace) return

    try {
      const tx = await lucid
        .newTx()
        .payToAddress(toAccount, { lovelace: BigInt(lovelace) })
        .complete()

      const signedTx = await tx.sign().complete()

      const txHash = await signedTx.submit()

      console.log(txHash)
    } catch (e) {
      if (e instanceof Error) setError(e)
      else console.warn(e)
    }
  }, [lucid, toAccount, lovelace])

  const lovelaceSetter = useCallback((value: string) => {
    setError(undefined)

    const parsed = parseInt(value)
    if (isNaN(parsed)) return
    setLovelace(parsed)
  }, [])

  const toAccountSetter = useCallback((value: string) => {
    setError(undefined)
    setToAccount(value)
  }, [])

  return {
    error,
    lovelace,
    setLovelace: lovelaceSetter,
    toAccount,
    setToAccount: toAccountSetter,
    sendTransaction,
  }
}

export { useTransactionSender }
