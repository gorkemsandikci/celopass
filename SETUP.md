# 🚀 Celopass Setup Guide

## ✅ What's Already Done

- ✅ Celo Composer project initialized
- ✅ PaymentRouter.sol smart contract created
- ✅ Deploy script ready
- ✅ Frontend structure with RainbowKit
- ✅ Contract ABI and configuration files

## 📋 Next Steps

### 1. Install Dependencies

```bash
cd /home/gorkem/dev/www/personal/Celo/celopass
pnpm install
```

### 2. Set Up Environment Variables

**Frontend (apps/web/.env.local):**
```bash
cd apps/web
cp .env.local.example .env.local  # If exists, or create manually
```

Add to `.env.local`:
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_PAYMENT_ROUTER_ADDRESS=0x0000000000000000000000000000000000000000
```

Get WalletConnect Project ID: https://cloud.walletconnect.com/

**Contracts (apps/contracts/.env):**
```bash
cd apps/contracts
```

Create `.env` file:
```
PRIVATE_KEY=your_deployer_private_key_here
CELOSCAN_API_KEY=your_celoscan_api_key_here
```

⚠️ **Important:** Use a test wallet, never your mainnet wallet with real funds!

### 3. Compile Smart Contracts

```bash
cd apps/contracts
pnpm compile
```

### 4. Deploy to Alfajores Testnet

```bash
# Make sure you have testnet CELO in your deployer wallet
# Get testnet funds: https://faucet.celo.org/alfajores

pnpm deploy:alfajores
```

Save the deployed contract address!

### 5. Update Frontend with Contract Address

Edit `apps/web/.env.local`:
```
NEXT_PUBLIC_PAYMENT_ROUTER_ADDRESS=0x... # Your deployed address
```

### 6. Start Development Server

```bash
# From project root
pnpm dev

# Or from apps/web
cd apps/web
pnpm dev
```

Visit: http://localhost:3000

### 7. Verify Contract (Optional)

```bash
cd apps/contracts
npx hardhat verify --network alfajores <CONTRACT_ADDRESS> <PLATFORM_WALLET_ADDRESS>
```

---

## 🧪 Test the Contract

1. Connect your wallet (RainbowKit)
2. Create a payment link
3. Test payment flow

---

## 📚 Resources

- [Celo Faucet](https://faucet.celo.org/alfajores) - Get testnet funds
- [WalletConnect Cloud](https://cloud.walletconnect.com/) - Get Project ID
- [Celoscan](https://celoscan.io/) - Block explorer

---

## 🐛 Troubleshooting

**"Cannot find module" errors:**
```bash
pnpm install
```

**Contract deployment fails:**
- Check you have testnet CELO in your wallet
- Verify PRIVATE_KEY is correct in `.env`
- Check network is set to `alfajores`

**Frontend won't connect wallet:**
- Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set
- Restart dev server after changing `.env.local`

