import Link from "next/link"

import styles from "../styles/index.module.css"

const Index = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Cardano Lucid Blockfrost Proxy API Examples</h1>

    <div>
      <ul className={styles.list}>
        <li>
          <Link href="/transaction">Processing a Transaction</Link>
        </li>

        <li>
          <Link href="/assets">Listing Assets</Link>
        </li>
      </ul>
    </div>
  </div>
)

export default Index
