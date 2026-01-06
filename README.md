# The Graph Delegator Dashboard

A simple, mobile-friendly dashboard for analyzing delegations on The Graph Network (Arbitrum).

## Features

- 📊 **Portfolio Summary**: View total staked tokens, realized rewards, and delegation counts
- 🎯 **Indexer Analysis**: See all your indexers with combined stake information
- 📱 **Mobile-First Design**: Fully responsive design optimized for all devices
- 🌙 **Dark/Light Theme**: Toggle between themes for comfortable viewing
- 🔍 **Active/Inactive Filtering**: Show or hide inactive delegations
- 🚀 **No API Key Required**: Server-side proxy handles authentication securely

## Live Demo

🌐 **[https://graph-delegator-dashboard.vercel.app/](https://graph-delegator-dashboard.vercel.app/)**

## Network Support

Currently supports **Arbitrum** delegations. The dashboard groups multiple stakes to the same indexer and shows:

- Combined staked amounts per indexer
- Total unrealized and realized rewards
- Indexer metadata (description, website, avatar)
- Stake count badges for multiple stakes
- Smart status indicators (Active/Inactive/Mixed)

## Demo Addresses

Try these Arbitrum addresses:
- `0x25a981d1fdefcde326dd0f868795b290c88430fa` - Multiple indexers with mixed stakes
- `0xc69de45ec5e4ef1df6bef14229660c9211917d86` - Large delegator with many active stakes
- `0x9c90de4d1eab3d7ec5dca89ddbebc2e62d3ac311` - Active delegator example

## Deployment

This project is deployed on Vercel with:
- Static frontend (HTML/CSS/JavaScript)
- Serverless API functions for secure subgraph queries
- Environment variables for API key management

## Recent Updates

- ✅ Switched from Ethereum mainnet to Arbitrum subgraph
- ✅ Fixed delegation counting by grouping stakes by indexer
- ✅ Added mobile-first responsive design
- ✅ Implemented proper error handling for null values
- ✅ Added The Graph brand assets and styling

---

*Last updated: January 6, 2026*