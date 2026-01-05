# 🏦 Graph Protocol Delegator Dashboard

A simple, elegant dashboard to analyze Graph Protocol delegator positions, track rewards, and monitor indexer performance in real-time.

![Dashboard Preview](https://img.shields.io/badge/Status-Demo-yellow) ![License](https://img.shields.io/badge/License-MIT-blue) ![The Graph](https://img.shields.io/badge/The%20Graph-Protocol-blueviolet)

## ✨ Features

- **📊 Portfolio Overview**: View total staked GRT, realized rewards, and active delegations
- **🎯 Delegation Analysis**: Track performance of each indexer delegation
- **💰 Reward Tracking**: Monitor both realized and unrealized rewards
- **📈 Performance Metrics**: See gains/losses with percentage calculations
- **🏭 Indexer Details**: View indexer URLs, reward cuts, and pool sizes
- **📱 Responsive Design**: Works perfectly on desktop and mobile

## 🚀 Live Demo

**Try it now:** [https://paulieb14.github.io/graph-delegator-dashboard/](https://paulieb14.github.io/graph-delegator-dashboard/)

### Demo Wallet Addresses

Test the dashboard with these real delegator addresses:

- **Single Indexer Strategy**: `0x1908a3232eed9186b4a5b666075711d2db0200e5`
  - 5.09M GRT delegated to p-ops
  - +5.22% unrealized gain

- **Diversified Strategy**: `0x825b0a6393fc7c25f44f1985ad7857424bfb9ae6`
  - 121.77M GRT across 15+ indexers
  - 702K GRT in realized rewards

## 🛠️ How It Works

This dashboard uses **The Graph Network subgraph** to fetch real-time delegation data:

1. **Enter wallet address** in the search field
2. **Click "Analyze Delegations"** to fetch data
3. **View detailed breakdown** of all delegations
4. **Track performance** with unrealized reward calculations

### Data Sources

- **Subgraph**: Graph Network Ethereum (`9Co7EQe5PgW3ugCUJrJgRv4u9zdEuDJf8NvMWftNsBH8`)
- **Network**: Ethereum Mainnet
- **Update Frequency**: Real-time via The Graph Protocol

## 📊 What You'll See

### Portfolio Summary
- Total GRT staked across all indexers
- Total realized rewards from closed positions
- Number of active vs. total delegations
- Historical delegation activity

### Per-Indexer Breakdown
- **Original Amount**: Your initial delegation
- **Current Value**: Current worth based on exchange rates
- **Unrealized Rewards**: Gains/losses since delegation
- **Performance**: Percentage gain/loss
- **Indexer Details**: Reward cuts, URLs, pool sizes

### Key Metrics
- **Personal Exchange Rate**: Your entry rate when delegating
- **Current Exchange Rate**: Live rate from the indexer
- **Reward Cuts**: Indexer's fee structure
- **Pool Size**: Total GRT delegated to each indexer

## 🏗️ Technical Details

### Built With
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Data**: The Graph Protocol subgraph
- **Styling**: Modern CSS with gradients and animations
- **Responsive**: Mobile-first design

### Architecture
```
User Input (Wallet Address)
    ↓
GraphQL Query to The Graph Network
    ↓
Data Processing & Calculations
    ↓
Dynamic UI Rendering
```

### Key Calculations
```javascript
// Unrealized Rewards Calculation
const originalShares = stakedAmount / personalExchangeRate;
const currentValue = originalShares * currentExchangeRate;
const unrealizedRewards = currentValue - stakedAmount;
const performance = (unrealizedRewards / stakedAmount) * 100;
```

## 🔧 Local Development

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/PaulieB14/graph-delegator-dashboard.git
   cd graph-delegator-dashboard
   ```

2. Open `index.html` in your browser or serve it locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000`

### File Structure
```
graph-delegator-dashboard/
├── index.html          # Main dashboard file
├── README.md          # This file
└── LICENSE            # MIT License
```

## 🚀 Production Implementation

This is currently a **demo version** with sample data. For production use:

### Option 1: Direct Subgraph Integration
```javascript
// Replace demo data with real GraphQL calls
const GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-ethereum';

async function fetchDelegatorData(address) {
    const query = `
        query GetDelegator($id: ID!) {
            delegator(id: $id) {
                totalStakedTokens
                stakes { ... }
            }
        }
    `;
    
    const response = await fetch(GRAPH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id: address.toLowerCase() } })
    });
    
    return await response.json();
}
```

### Option 2: Backend API
Create a backend service using:
- **Node.js/Express** with GraphQL client
- **Python/Flask** with requests library
- **Serverless functions** (Vercel, Netlify)

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

### Enhancements
- [ ] Add wallet connection (MetaMask, WalletConnect)
- [ ] Historical performance charts
- [ ] Indexer comparison tools
- [ ] Export data to CSV
- [ ] Dark mode toggle
- [ ] Multi-network support (Arbitrum, Polygon)

### Bug Reports
Please open an issue with:
- Browser and version
- Wallet address tested
- Expected vs actual behavior
- Screenshots if applicable

## 📈 Roadmap

- **v1.1**: Live subgraph integration
- **v1.2**: Wallet connection support
- **v1.3**: Historical charts and analytics
- **v2.0**: Multi-network support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The Graph Protocol** for providing the subgraph infrastructure
- **Graph Network** community for delegation data
- **Indexers** who secure and serve the network

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/PaulieB14/graph-delegator-dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/PaulieB14/graph-delegator-dashboard/discussions)
- **The Graph Discord**: [Join Community](https://discord.gg/graphprotocol)

---

**⭐ Star this repo if you find it useful!**

Built with ❤️ for the Graph Protocol community