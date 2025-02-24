# Okto Web3 React Integration

Welcome to the **Okto Web3 React Integration** repository! This project demonstrates how to integrate the **Okto SDK** into a **React + Vite** application, enabling authentication, wallet management, and token transfers using Okto Embedded Wallet.

## 🚀 Features
- **Google OAuth Authentication** (via `@react-oauth/google`)
- **Okto Embedded Wallet Integration**
- **User Portfolio & Account Details Fetching**
- **Token Transfers** (Native & ERC-20)
- **NFT Transfers** (ERC-721 & ERC-1155)
- **Raw Contract Interactions** (EVM)

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the project root and add your credentials:
```plaintext
VITE_CLIENT_PRIV_KEY="YOUR_CLIENT_PRIVATE_KEY"
VITE_CLIENT_SWA="YOUR_CLIENT_SWA"
VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```
Your app will run at **http://localhost:5173**

---

## 📌 Project Structure
```
📂 src/
 ├── components/   # Reusable UI components
 ├── pages/        # Application pages
 ├── hooks/        # Custom React hooks
 ├── utils/        # Helper functions
 ├── App.tsx       # Main application component
 ├── main.tsx      # React entry point with Okto & Google OAuth Providers
```

---

## 📡 Okto Integration Guide

### 🏗 1. Initializing Okto SDK
In `main.tsx`, wrap your app with the Okto and Google OAuth Providers:
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { OktoProvider } from "@okto_web3/react-sdk";
import { GoogleOAuthProvider } from "@react-oauth/google";

const config = {
    environment: "sandbox",
    clientPrivateKey: import.meta.env.VITE_CLIENT_PRIV_KEY,
    clientSWA: import.meta.env.VITE_CLIENT_SWA,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <OktoProvider config={config}>
                <App />
            </OktoProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
```

---

### 🔑 2. User Authentication
Use Google OAuth for user authentication and session management.
```tsx
import { useOkto } from "@okto_web3/react-sdk";
import { GoogleLogin } from "@react-oauth/google";

function App() {
    const oktoClient = useOkto();

    async function handleGoogleLogin(credentialResponse: any) {
        try {
            await oktoClient.loginUsingOAuth({
                idToken: credentialResponse.credential,
                provider: "google",
            });
        } catch (error) {
            console.error("Authentication error:", error);
        }
    }

    return (
        <div>
            {oktoClient.userSWA ? (
                <UserDashboard />
            ) : (
                <GoogleLogin onSuccess={handleGoogleLogin} />
            )}
        </div>
    );
}
```

---

### 👛 3. Fetch User Details & Portfolio
Retrieve user wallet details and portfolio holdings.
```tsx
import { useOkto, getAccount, getPortfolio } from "@okto_web3/react-sdk";
import { useEffect, useState } from "react";

export function UserDashboard() {
    const oktoClient = useOkto();
    const [accounts, setAccounts] = useState([]);
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            const userAccounts = await getAccount(oktoClient);
            setAccounts(userAccounts.data);
            
            const userPortfolio = await getPortfolio(oktoClient);
            setPortfolio(userPortfolio);
        }
        fetchUserData();
    }, []);

    return (
        <div>
            <h2>Welcome {oktoClient.userSWA?.userAddress}</h2>
            <h3>Your Accounts:</h3>
            {accounts.map(account => (
                <div key={account.caip_id}>
                    <p>Network: {account.network_name}</p>
                    <p>Address: {account.address}</p>
                </div>
            ))}
            <h3>Portfolio:</h3>
            <pre>{JSON.stringify(portfolio, null, 2)}</pre>
        </div>
    );
}
```

---

### 🔄 4. Token Transfer (Polygon Amoy)
```tsx
import { useOkto } from "@okto_web3/react-sdk";
import { tokenTransfer } from "@okto_web3/react-sdk/abstracted";
import { useState } from "react";

export function TokenTransfer() {
    const oktoClient = useOkto();
    const [status, setStatus] = useState("");

    async function handleTransfer() {
        try {
            const txHash = await tokenTransfer(oktoClient, {
                amount: BigInt("1000000000"), // 1 POL in smallest unit
                recipient: "YOUR_RECIPIENT_ADDRESS",
                token: "",
                caip2Id: "eip155:137",
            });
            setStatus(`Transfer complete! Hash: ${txHash}`);
        } catch (error) {
            console.error("Transfer failed:", error);
            setStatus(`Transfer failed: ${error.message}`);
        }
    }

    return (
        <div>
            <h2>Token Transfer</h2>
            <button onClick={handleTransfer}>Send 1 POL</button>
            <p>{status}</p>
        </div>
    );
}
```

---

## 🔗 Useful References
- [Okto SDK Documentation](https://docs.okto.com)
- [Polygon Amoy Faucet](https://faucet.polygon.technology)
- [Etherscan](https://etherscan.io)

## 🤝 Contributing
Pull requests are welcome! If you find any issues, feel free to open an issue.

## 📜 License
This project is licensed under the **MIT License**.

---

### 🎉 Happy Coding! 🚀

