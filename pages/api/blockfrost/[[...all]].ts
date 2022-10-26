import { NextApiHandler } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

const getTarget = (url?: string) => {
  if (url?.startsWith("/api/blockfrost/0")) return "https://cardano-testnet.blockfrost.io/api/v0"
  if (url?.startsWith("/api/blockfrost/1")) return "https://cardano-mainnet.blockfrost.io/api/v0"
  return null
}

const getProjectId = (url?: string) => {
  if (url?.startsWith("/api/blockfrost/0")) return process.env.BLOCKFROST_PROJECT_ID_TESTNET
  if (url?.startsWith("/api/blockfrost/1")) return process.env.BLOCKFROST_PROJECT_ID_MAINNET
  return null
}

const blockfrostProxy: NextApiHandler = async (req, res) => {
  const target = getTarget(req.url)
  const PROJECT_ID = getProjectId(req.url)

  try {
    if (!target || !PROJECT_ID) throw new Error("Invalid target or project id")

    const response = await httpProxyMiddleware(req, res, {
      target,
      headers: {
        PROJECT_ID,
      },
      pathRewrite: [
        {
          patternStr: "^/api/blockfrost/0",
          replaceStr: "",
        },
        {
          patternStr: "^/api/blockfrost/1",
          replaceStr: "",
        },
      ],
    })

    return response
  } catch (e) {
    console.log("Blockfrost proxy error", e)

    // NOTE(Alan): Not sure if this is compatible with Lucid / the Blockfrost provider
    return res.status(400).end()
  }
}

export default blockfrostProxy
