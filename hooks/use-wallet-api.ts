import { WalletApi } from 'lucid-cardano';
import { useEffect, useState } from 'react';

const useWalletApi = () => {
  const [isValid, setIsValid] = useState()
  const [walletApi, setWalletApi] = useState<WalletApi>()

  useEffect(() => {
    if (!window.cardano?.nami) return

    window.cardano.nami.enable().then(setWalletApi)
  }, [])

  return walletApi
}

export { useWalletApi }
