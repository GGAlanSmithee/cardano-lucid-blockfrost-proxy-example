import { useAssets } from "hooks/use-assets"
import { useHasNamiExtension } from "hooks/use-has-nami-extension"
import { useLucid } from "hooks/use-lucid"
import { lovelaceToAda } from "lib/lovelace-to-ada"
import { isNil } from "lodash"

import styles from "../styles/index.module.css"

const Index = () => {
  const hasNamiExtension = useHasNamiExtension()
  const { lucid, networkId } = useLucid()
  const { lovelace, assets } = useAssets(lucid, networkId)

  // strict equals to avoid undefined
  if (hasNamiExtension === false)
    return <div>This example only works with the Nami extension installed. Please install it.</div>

  // not initialized yet
  if (!lucid) return null

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Listing Assets Example</h1>

      {lovelace > 0 && <div>ADA: {lovelaceToAda(lovelace)}</div>}

      <div>
        <ul className={styles.list}>
          {assets.map((a) => {
            const name = a.metadata?.name || a.onchain_metadata?.name || ""

            return (
              <li key={a.asset}>
                <div>
                  {name}

                  {Number(a.quantity) > 1 &&
                    ` (${lovelaceToAda(
                      Number(a.quantity) / Math.pow(10, a.metadata?.decimals || 0)
                    )})`}
                </div>

                {!isNil(a.metadata?.logo) && (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width="64"
                      height="auto"
                      alt={`${name} logo`}
                      src={`data:image/png;base64,${a.metadata?.logo}`}
                    />
                  </div>
                )}

                {!isNil(a.onchain_metadata?.image) && (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width="64"
                      height="auto"
                      alt={`${name} NFT`}
                      src={(a.onchain_metadata?.image as string).replace(
                        "ipfs://",
                        "https://ipfs.blockfrost.dev/ipfs/"
                      )}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Index
