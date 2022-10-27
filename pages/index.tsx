import { useHasNamiExtension } from 'hooks/use-has-nami-extension';
import { useLucid } from 'hooks/use-lucid';
import { useTransactionSender } from 'hooks/use-transaction';

import styles from '../styles/index.module.css';

const Index = () => {
  const hasNamiExtension = useHasNamiExtension()
  const { lucid, networkId } = useLucid()
  const { lovelace, setLovelace, toAccount, setToAccount, sendTransaction } =
    useTransactionSender(lucid)

  // strict equals to avoid undefined
  if (hasNamiExtension === false)
    return <div>This example only works with the Nami extension installed. Please install it.</div>

  // not initialized yet
  if (!lucid) return null

  return (
    <div className={styles.container}>
      <div>
        Network:{" "}
        <b>
          {networkId === 0
            ? "Testnet"
            : networkId === 1
            ? "Mainnet"
            : "Invalid network, use Testnet or Mainnet"}
        </b>
        <div className={styles.switch}>Switch network in the nami wallet extension</div>
      </div>

      {networkId === 1 && (
        <>
          <br />
          <div>
            <b className={styles.warning}>
              mainnet - be aware that you are sending real ADA to real people!
            </b>
          </div>
        </>
      )}

      <br />

      <div>
        <label>
          <span className={styles.label}>To Account</span>

          <input
            type="text"
            placeholder="account"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value?.toString())}
          />
        </label>
      </div>

      <div>
        <label>
          <span className={styles.label}>Lovelace</span>
          <input
            type="number"
            step="1000"
            name="amount"
            value={lovelace}
            onChange={(e) => setLovelace(Number(e.target.value))}
          />
        </label>
      </div>

      <br />

      <div>
        <button onClick={sendTransaction}>Send transaction</button>
      </div>
    </div>
  )
}

export default Index
