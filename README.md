# 🏦 Graph Protocol Delegator Dashboard

A simple, elegant dashboard to analyze Graph Protocol delegator positions, track rewards, and monitor indexer performance in real-time.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![The Graph](https://img.shields.io/badge/The%20Graph-Protocol-blueviolet)

## ✨ Features

- **📊 Portfolio Overview**: View total staked GRT, realized rewards, and active delegations
- **🎯 Delegation Analysis**: Track performance of each indexer delegation
- **💰 Reward Tracking**: Monitor both realized and unrealized rewards
- **📈 Performance Metrics**: See gains/losses with percentage calculations
- **🏭 Indexer Details**: View indexer URLs, reward cuts, and pool sizes
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🔒 Secure**: API keys stored locally in browser only

## 🚀 Live Demo

**Try it now:** [https://paulieb14.github.io/graph-delegator-dashboard/](https://paulieb14.github.io/graph-delegator-dashboard/)

## 🔑 Setup Instructions

### 1. Get Your Free API Key

1. Visit [The Graph Studio](https://thegraph.com/studio/)
2. Create a free account
3. Navigate to your dashboard
4. Copy your API key

### 2. Use the Dashboard

1. Open the [live dashboard](https://paulieb14.github.io/graph-delegator-dashboard/)
2. Enter your API key in the yellow section at the top
3. Click "Save Key" (stored securely in your browser only)
4. Enter any wallet address to analyze delegations
5. View real-time delegation data and rewards!

## 🔒 Security & Privacy

- **API Key Storage**: Your API key is stored locally in your browser using `localStorage`
- **No Server**: This is a pure frontend application - no backend server involved
- **Direct Connection**: Connects directly to The Graph Network subgraph
- **No Tracking**: No analytics, cookies, or user tracking
- **Open Source**: Full source code available for review

## 📊 What You'll See

### Portfolio Summary
- Total GRT staked across all indexers
- Realized rewards (withdrawn)
- Number of active and total delegations

### Per-Indexer Analysis
- **Original Amount**: Your initial delegation
- **Unrealized Rewards**: Current gains/losses
- **Realized Rewards**: Already withdrawn rewards
- **Performance**: Percentage gain/loss
- **Indexer Details**: Reward cuts, pool sizes, URLs

## 🛠️ Technical Details

### Data Source
- **Subgraph**: Graph Network Ethereum (`9Co7EQe5PgW3ugCUJrJgRv4u9zdEuDJf8NvMWftNsBH8`)
- **Network**: Ethereum Mainnet
- **API**: The Graph Gateway with personal API key

### Calculations
- **Unrealized Rewards**: `(stakedTokens × currentExchangeRate / personalExchangeRate) - stakedTokens`
- **Performance**: `unrealizedRewards / originalStake × 100%`
- **Formatting**: Automatic K/M suffixes for large numbers

### Browser Support
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers

## 📝 Demo Addresses

Try these addresses to see the dashboard in action:

- `0x1908a3232eed9186b4a5b666075711d2db0200e5` - Single indexer strategy
- `0x825b0a6393fc7c25f44f1985ad7857424bfb9ae6` - Diversified portfolio

## 🚨 Important Notes

### API Key Security
- **Never share your API key** with anyone
- **Don't commit API keys** to repositories
- **Monitor your usage** in The Graph Studio
- **Regenerate keys** if compromised

### Rate Limits
- The Graph API has rate limits based on your plan
- Free tier: 1,000 queries per month
- Paid plans available for higher usage

### Data Accuracy
- Data is fetched in real-time from The Graph Network
- Exchange rates update as indexers collect rewards
- Small delays possible due to blockchain confirmation times

## 🤝 Contributing

Contributions welcome! This is a simple HTML/CSS/JS application.

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Enter your API key and test

### Improvements Needed
- [ ] Add more networks (Arbitrum, Polygon)
- [ ] Historical performance charts
- [ ] Export functionality
- [ ] Mobile app version
- [ ] Notification system for rewards

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- [The Graph Protocol](https://thegraph.com/) for the decentralized indexing network
- [The Graph Studio](https://thegraph.com/studio/) for the API infrastructure
- Graph community for delegation data and insights

---

**Built with ❤️ for the Graph Protocol community**

*Analyze your delegations, track your rewards, optimize your strategy!*