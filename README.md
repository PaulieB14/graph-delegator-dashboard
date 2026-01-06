# 🏦 Graph Protocol Delegator Dashboard

A simple, elegant dashboard to analyze Graph Protocol delegator positions, track rewards, and monitor indexer performance in real-time.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![The Graph](https://img.shields.io/badge/The%20Graph-Protocol-blueviolet) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## ✨ Features

- **📊 Portfolio Overview**: View total staked GRT, realized rewards, and active delegations
- **🎯 Delegation Analysis**: Track performance of each indexer delegation
- **💰 Reward Tracking**: Monitor both realized and unrealized rewards
- **📈 Performance Metrics**: See gains/losses with percentage calculations
- **🏭 Indexer Details**: View indexer URLs, reward cuts, and pool sizes
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🚀 No Setup Required**: Just enter a wallet address and go!

## 🌐 Live Deployments

### **GitHub Pages** (Client-side with user API keys)
**URL**: [https://paulieb14.github.io/graph-delegator-dashboard/](https://paulieb14.github.io/graph-delegator-dashboard/)
- Requires users to get their own free API key from The Graph Studio
- Most secure approach - each user manages their own rate limits

### **Vercel** (Server-side with shared API key) - **RECOMMENDED**
**URL**: [Deploy your own on Vercel →](https://vercel.com/new/clone?repository-url=https://github.com/PaulieB14/graph-delegator-dashboard)
- No API key required for users
- Instant analysis - just enter wallet address
- Server-side API handling

## 🚀 Deploy to Vercel

### **One-Click Deploy**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PaulieB14/graph-delegator-dashboard)

### **Manual Deployment**

1. **Fork this repository**
2. **Sign up for Vercel** at [vercel.com](https://vercel.com)
3. **Connect your GitHub account** to Vercel
4. **Import your forked repository**
5. **Add environment variable**:
   - Variable name: `GRAPH_API_KEY`
   - Value: Your API key from [The Graph Studio](https://thegraph.com/studio/)
6. **Deploy!** 🎉

### **Get Your Graph API Key**
1. Visit [The Graph Studio](https://thegraph.com/studio/)
2. Create a free account
3. Navigate to your dashboard
4. Copy your API key
5. Add it as `GRAPH_API_KEY` environment variable in Vercel

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

## 🛠️ Technical Architecture

### **Vercel Version (Recommended)**
```
User → Vercel Frontend → Vercel API Route → The Graph Network
```
- **Frontend**: Static HTML/CSS/JS served by Vercel
- **Backend**: Serverless function (`/api/delegator.js`)
- **API Key**: Stored securely as environment variable
- **CORS**: Properly configured for cross-origin requests

### **GitHub Pages Version**
```
User → GitHub Pages → User's Browser → The Graph Network
```
- **Frontend**: Static HTML/CSS/JS served by GitHub Pages
- **API Key**: User provides their own, stored in localStorage
- **Security**: Each user manages their own rate limits

## 📝 Demo Addresses

Try these addresses to see the dashboard in action:

- `0x1908a3232eed9186b4a5b666075711d2db0200e5` - Single indexer strategy
- `0x825b0a6393fc7c25f44f1985ad7857424bfb9ae6` - Diversified portfolio

## 🔧 Local Development

### **Prerequisites**
- Node.js 18+ (for Vercel development)
- Git

### **Setup**
```bash
# Clone the repository
git clone https://github.com/PaulieB14/graph-delegator-dashboard.git
cd graph-delegator-dashboard

# Install Vercel CLI (optional)
npm install -g vercel

# Create .env.local file
echo "GRAPH_API_KEY=your_api_key_here" > .env.local

# Start development server
vercel dev
```

### **File Structure**
```
├── index.html          # Frontend dashboard
├── api/
│   └── delegator.js    # Vercel serverless function
├── vercel.json         # Vercel configuration
├── package.json        # Node.js configuration
└── README.md          # This file
```

## 🚨 Important Notes

### **API Key Security**
- **Vercel**: API key stored as environment variable (secure)
- **GitHub Pages**: Users provide their own API key (most secure)
- **Never commit API keys** to the repository

### **Rate Limits**
- **Vercel**: Shared rate limit across all users
- **GitHub Pages**: Each user has their own rate limit
- **Free tier**: 1,000 queries per month per API key
- **Monitor usage** in The Graph Studio

### **Data Accuracy**
- Data fetched in real-time from The Graph Network
- Exchange rates update as indexers collect rewards
- Small delays possible due to blockchain confirmation times

## 🤝 Contributing

Contributions welcome! This project uses:
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Vercel serverless functions
- **API**: The Graph Network subgraph

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `vercel dev`
5. Submit a pull request

### **Roadmap**
- [ ] Add more networks (Arbitrum, Polygon)
- [ ] Historical performance charts
- [ ] Export functionality (CSV/JSON)
- [ ] Email notifications for rewards
- [ ] Mobile app version
- [ ] Multi-wallet comparison

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- [The Graph Protocol](https://thegraph.com/) for the decentralized indexing network
- [Vercel](https://vercel.com/) for the excellent serverless platform
- [The Graph Studio](https://thegraph.com/studio/) for the API infrastructure
- Graph community for delegation data and insights

---

**Built with ❤️ for the Graph Protocol community**

*Analyze your delegations, track your rewards, optimize your strategy!*