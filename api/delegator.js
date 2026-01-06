const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { walletAddress } = req.body;
    const GRAPH_API_KEY = process.env.GRAPH_API_KEY;

    if (!GRAPH_API_KEY) {
        return res.status(500).json({ error: 'API key not configured on the server.' });
    }

    const subgraphUrl = `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/9Co7EQe5PgW3ugCUJrJgRv4u9zdEuDJf8NvMWftNsBH8`;

    const query = `
        query GetDelegatorInfo($walletAddress: String!) {
            delegator(id: $walletAddress) {
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
                        geoHash
                        account {
                            metadata {
                                displayName
                                description
                                image
                                website
                            }
                        }
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

    try {
        const response = await fetch(subgraphUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { walletAddress: walletAddress.toLowerCase() }
            }),
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching from subgraph:', error);
        res.status(500).json({ error: 'Failed to fetch data from The Graph subgraph.' });
    }
};