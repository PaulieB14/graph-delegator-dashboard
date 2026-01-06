// Vercel serverless function for Graph Protocol delegator queries
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress } = req.body;

    if (!walletAddress || !walletAddress.startsWith('0x')) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    // Get API key from environment variable
    const apiKey = process.env.GRAPH_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // The Graph Network Ethereum subgraph URL
    const subgraphUrl = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/9Co7EQe5PgW3ugCUJrJgRv4u9zdEuDJf8NvMWftNsBH8`;

    const query = `
      query GetDelegatorInfo {
        delegator(id: "${walletAddress.toLowerCase()}") {
          id
          totalStakedTokens
          totalUnstakedTokens
          totalRealizedRewards
          stakesCount
          activeStakesCount
          createdAt
          stakes(first: 50) {
            id
            indexer {
              id
              url
              defaultDisplayName
              stakedTokens
              delegatedTokens
              indexingRewardCut
              queryFeeCut
              delegationExchangeRate
              queryFeesCollected
              rewardsEarned
            }
            stakedTokens
            unstakedTokens
            lockedTokens
            lockedUntil
            shareAmount
            personalExchangeRate
            realizedRewards
            createdAt
            lastDelegatedAt
            lastUndelegatedAt
          }
        }
      }
    `;

    const response = await fetch(subgraphUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    if (data.errors) {
      return res.status(400).json({ error: data.errors[0].message });
    }

    // Return the delegator data
    res.status(200).json(data.data);

  } catch (error) {
    console.error('Error fetching delegator data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}