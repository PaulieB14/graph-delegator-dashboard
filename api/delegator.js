const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed. Use POST.' 
        });
    }

    try {
        // Parse request body
        let walletAddress;
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            walletAddress = body.walletAddress;
        } catch (parseError) {
            console.error('Body parsing error:', parseError);
            return res.status(400).json({ 
                error: 'Invalid JSON in request body' 
            });
        }

        // Validate inputs
        const GRAPH_API_KEY = process.env.GRAPH_API_KEY;

        if (!GRAPH_API_KEY) {
            console.error('Missing GRAPH_API_KEY environment variable');
            return res.status(500).json({ 
                error: 'Server configuration error: API key not found' 
            });
        }

        if (!walletAddress) {
            return res.status(400).json({ 
                error: 'Wallet address is required in request body' 
            });
        }

        if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
            return res.status(400).json({ 
                error: 'Invalid wallet address format' 
            });
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
                            allocatedTokens
                            unstakedTokens
                            lockedTokens
                            totalReturn
                            annualizedReturn
                            stakingEfficiency
                            geoHash
                            createdAt
                            account {
                                id
                                metadata {
                                    displayName
                                    description
                                    image
                                    website
                                    codeRepository
                                    isOrganization
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

        console.log('Making request to subgraph for wallet:', walletAddress);

        const response = await fetch(subgraphUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Graph-Delegator-Dashboard/1.0'
            },
            body: JSON.stringify({
                query,
                variables: { walletAddress: walletAddress.toLowerCase() }
            }),
            timeout: 30000 // 30 second timeout
        });

        console.log('Subgraph response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Subgraph HTTP error:', response.status, errorText);
            return res.status(502).json({ 
                error: `Subgraph request failed with status ${response.status}`,
                details: errorText.substring(0, 200) // Limit error message length
            });
        }

        let data;
        try {
            const responseText = await response.text();
            console.log('Raw response length:', responseText.length);
            data = JSON.parse(responseText);
        } catch (jsonError) {
            console.error('JSON parsing error:', jsonError);
            return res.status(502).json({ 
                error: 'Invalid JSON response from subgraph',
                details: jsonError.message
            });
        }

        // Check for GraphQL errors
        if (data.errors && data.errors.length > 0) {
            console.error('GraphQL errors:', data.errors);
            return res.status(400).json({ 
                error: 'GraphQL query failed', 
                details: data.errors[0].message 
            });
        }

        // Validate response structure
        if (!data.data) {
            console.error('Missing data field in response:', data);
            return res.status(502).json({ 
                error: 'Invalid response structure from subgraph' 
            });
        }

        console.log('Successfully processed request for wallet:', walletAddress);
        return res.status(200).json(data);

    } catch (error) {
        console.error('Unexpected error in delegator API:', error);
        
        // Handle different types of errors
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            return res.status(503).json({ 
                error: 'Unable to connect to The Graph Network',
                details: 'Network connection failed'
            });
        }
        
        if (error.name === 'AbortError' || error.code === 'ETIMEDOUT') {
            return res.status(504).json({ 
                error: 'Request timeout',
                details: 'The Graph Network request took too long'
            });
        }

        return res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
};