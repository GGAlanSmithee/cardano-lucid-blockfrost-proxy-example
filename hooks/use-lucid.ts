import { isNil } from "lodash"
import { Blockfrost, Lucid } from "lucid-cardano"
import { useCallback, useEffect, useState } from "react"

import { useNetworkId } from "./use-network-id"
import { useWalletApi } from "./use-wallet-api"

const useLucid = () => {
  const [lucid, setLucid] = useState<Lucid>()
  const walletApi = useWalletApi()
  const networkId = useNetworkId(walletApi)

  const initializeLucid = useCallback(async () => {
    if (isNil(networkId) || isNil(walletApi)) return

    const provider = new Blockfrost(`/api/blockfrost/${networkId}`)
    const network = networkId === 0 ? "Testnet" : "Mainnet"

    const updatedLucid = await (isNil(lucid)
      ? Lucid.new(provider, network)
      : lucid.switchProvider(provider, network))

    const lucidWithWallet = updatedLucid.selectWallet(walletApi)

    setLucid(lucidWithWallet)
  }, [lucid, networkId, walletApi])

  useEffect(() => {
    initializeLucid()
  }, [initializeLucid])

  return {
    networkId,
    walletApi,
    lucid,
  }
}

export { useLucid }
