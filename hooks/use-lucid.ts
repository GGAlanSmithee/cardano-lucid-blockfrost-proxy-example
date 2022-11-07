import { isNil } from "lodash"
import { Blockfrost, Lucid } from "lucid-cardano"
import { useEffect } from "react"

import { useNetworkId } from "./use-network-id"
import { useWalletApi } from "./use-wallet-api"

const lucid = await Lucid.new()

const useLucid = () => {
  const walletApi = useWalletApi()
  const networkId = useNetworkId(walletApi)

  useEffect(() => {
    if (isNil(networkId) || isNil(walletApi)) return

    // todo, check which of these values that have actually changed
    lucid
      .switchProvider(
        new Blockfrost(`/api/blockfrost/${networkId}`),
        networkId === 0 ? "Testnet" : "Mainnet"
      )
      .then(() => {
        // for now, we always need to selectWallet after switching provider
        lucid.selectWallet(walletApi)
      })
  }, [networkId, walletApi])

  return {
    networkId,
    walletApi,
    lucid,
  }
}

export { useLucid }
