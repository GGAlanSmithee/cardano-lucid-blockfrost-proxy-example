import { useEffect, useState } from 'react';

const useHasNamiExtension = () => {
  const [hasNamiExtension, setHasNamiExtension] = useState<boolean>()

  useEffect(() => {
    // give the browser a chance to load the extension
    // and for it to inject itself into the window object
    const timeout = setTimeout(() => {
      setHasNamiExtension(!!window.cardano?.nami)
    }, 10)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return hasNamiExtension
}

export { useHasNamiExtension }
