import { WalletApi } from 'lucid-cardano';
import { useEffect, useState } from 'react';

const useNetworkId = (walletApi?: WalletApi) => {
  const [networkId, setNetworkId] = useState<number>()

  const onNetworkChange = (newNetworkId: unknown) => {
    setNetworkId(newNetworkId as number)
  }

  useEffect(() => {
    if (!walletApi?.experimental) return

    walletApi.getNetworkId().then(setNetworkId)

    walletApi.experimental.on("networkChange", onNetworkChange)

    return () => {
      walletApi.experimental.off("networkChange", onNetworkChange)
    }
  }, [walletApi])

  return networkId
}

export { useNetworkId }
