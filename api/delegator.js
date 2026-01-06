const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { walletAddress } = req.body;
    const GRAPH_API_KEY = process.env.GRAPH_API_KEY;

    console.log('Received request for wallet:', walletAddress);

    if (!GRAPH_API_KEY) {
        console.error('Server configuration error: API key not found.');
        return res.status(500).json({ error: 'Server configuration error: API key not found' });
    }

    if (!walletAddress || !walletAddress.startsWith('0x') || walletAddress.length !== 42) {
        console.error('Invalid wallet address format:', walletAddress);
        return res.status(400).json({ error: 'Invalid wallet address format' });
    }

    // Updated to use Arbitrum subgraph instead of Ethereum mainnet
    const subgraphUrl = `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/DZz4kDTdmzWLWsV373w2bSmoar3umKKH9y82SUKr5qmp`;

    // GraphQL query for Arbitrum delegator data
    const query = `
        query {
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
                    stakedTokens
                    unstakedTokens
                    lockedTokens
                    shareAmount
                    personalExchangeRate
                    realizedRewards
                    createdAt
                    lastDelegatedAt
                    lastUndelegatedAt
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
                        allocatedTokens
                        annualizedReturn
                        createdAt
                        geoHash
                        lockedTokens
                        stakingEfficiency
                        totalReturn
                        unstakedTokens
                        account {
                            id
                            metadata {
                                displayName
                                image
                                website
                                description
                                codeRepository
                                isOrganization
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        console.log('Fetching from Arbitrum subgraph URL:', subgraphUrl);
        const response = await fetch(subgraphUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Arbitrum subgraph API error response:', response.status, errorText);
            return res.status(response.status).json({ 
                error: `Arbitrum subgraph API responded with status ${response.status}`, 
                details: errorText 
            });
        }

        const data = await response.json();

        if (data.errors) {
            console.error('GraphQL errors:', data.errors);
            return res.status(400).json({ error: 'GraphQL query errors', details: data.errors });
        }

        console.log('Successfully fetched Arbitrum delegation data for:', walletAddress);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching from Arbitrum subgraph:', error);
        if (error.name === 'AbortError') {
            res.status(504).json({ error: 'Request to Arbitrum subgraph timed out.', details: error.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch data from The Graph Arbitrum subgraph.', details: error.message });
        }
    }
};