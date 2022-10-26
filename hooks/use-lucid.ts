import { isNil } from 'lodash';
import { Blockfrost, Lucid } from 'lucid-cardano';
import { useCallback, useEffect, useState } from 'react';

import { useNetworkId } from './use-network-id';
import { useWalletApi } from './use-wallet-api';

const useLucid = () => {
  const walletApi = useWalletApi()
  const networkId = useNetworkId(walletApi)

  const [lucid, setLucid] = useState<Lucid>()

  const createLucidInstance = useCallback(async () => {
    if (isNil(walletApi) || isNil(networkId)) return

    console.log("instantiating lucid instance with network id", networkId)

    const newLucidInstance = await Lucid.new(
      new Blockfrost(`/api/blockfrost/${networkId}`, ""),
      networkId === 0 ? "Testnet" : "Mainnet"
    )

    newLucidInstance.selectWallet(walletApi)

    return newLucidInstance
  }, [walletApi, networkId])

  useEffect(() => {
    createLucidInstance().then(setLucid)
  }, [walletApi, networkId, createLucidInstance])

  return {
    networkId,
    walletApi,
    lucid,
  }
}

export { useLucid }
