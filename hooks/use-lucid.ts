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
    if (isNil(walletApi)) return

    lucid.selectWallet(walletApi)
  }, [walletApi])

  useEffect(() => {
    if (isNil(networkId)) return

    lucid.switchProvider(
      new Blockfrost(`/api/blockfrost/${networkId}`),
      networkId === 0 ? "Testnet" : "Mainnet"
    )
  }, [networkId])

  return {
    networkId,
    walletApi,
    lucid,
  }
}

export { useLucid }
