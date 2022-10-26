import { useLucid } from 'hooks/use-lucid';
import { useTransactionSender } from 'hooks/use-transaction';

const Index = () => {
  const { lucid, networkId } = useLucid()
  const { lovelace, setLovelace, toAccount, setToAccount, sendTransaction } =
    useTransactionSender(lucid)

  return (
    <div>
      <div>
        Network ID:{" "}
        {networkId === 0
          ? "Testnet"
          : networkId === 1
          ? "Mainnet"
          : "Invalid network, use Testnet or Mainnet"}
      </div>

      <br />

      <div>
        <label>
          To Account{" "}
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
          Lovelace{" "}
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
        <button onClick={() => sendTransaction(50000n)}>Send transaction</button>
      </div>
    </div>
  )
}

export default Index
