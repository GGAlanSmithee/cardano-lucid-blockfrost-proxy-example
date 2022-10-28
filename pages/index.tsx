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

  const canTransact = lovelace > 0 && toAccount

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cardano Lucid Blockfrost Proxy API Example</h1>

      <div>
        Connected to the{" "}
        <b>
          {networkId === 0
            ? "Testnet"
            : networkId === 1
            ? "Mainnet"
            : "Invalid network, use Testnet or Mainnet"}
        </b>{" "}
        Network
        <div className={styles.info}>
          <small>You can switch network in the nami wallet extension</small>
        </div>
      </div>

      {networkId === 1 && (
        <>
          <br />
          <div>
            <b className={styles.warning}>
              ⚠️ mainnet - be aware that you are sending real ADA to real people! ⚠️
            </b>
          </div>
        </>
      )}

      <br />

      <div>
        <label>
          <span className={styles.label}>To Account</span>

          <input
            className={styles.input}
            type="text"
            placeholder="addr..."
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value?.toString())}
          />
        </label>
      </div>

      <div>
        <label>
          <span className={styles.label}>Lovelace</span>
          <input
            className={styles.input}
            type="number"
            min="0"
            step="1000"
            name="amount"
            value={lovelace}
            onChange={(e) => setLovelace(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <button disabled={!canTransact} className={styles.button} onClick={sendTransaction}>
          Send transaction
        </button>

        <p className={styles.info}>
          <small>
            {!canTransact && "specify a lovelace amount and account to send a transaction"}
          </small>
        </p>
      </div>
    </div>
  )
}

export default Index
