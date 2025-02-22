import { useOkto, getAccount, getPortfolio } from "@okto_web3/react-sdk";
import { useEffect, useState } from "react";



type Wallet = {
    caipId: string;
    networkName: string;
    address: string;
    caip2Id: string;
    networkSymbol: string;
}; 


type UserPortfolioData = {
    aggregatedData: {
        holdingsCount: string;
        holdingsPriceInr: string;
        holdingsPriceUsdt: string;
        totalHoldingPriceInr: string;
        totalHoldingPriceUsdt: string;
    };
    groupTokens: Array<{
        id: string;
        name: string;
        symbol: string;
        shortName: string;
        tokenImage: string;
        tokenAddress: string;
        groupId: string;
        caip2Id: string;
        precision: string;
        networkName: string;
        isPrimary: boolean;
        balance: string;
        holdingsPriceUsdt: string;
        holdingsPriceInr: string;
        aggregationType: string;
        tokens: Array<{
            id: string;
            name: string;
            symbol: string;
            shortName: string;
            tokenImage: string;
            tokenAddress: string;
            caip2Id: string;
            precision: string;
            networkName: string;
            isPrimary: boolean;
            balance: string;
            holdingsPriceUsdt: string;
            holdingsPriceInr: string;
        }>;
    }>;
};

export function UserDashboard() {
    const oktoClient = useOkto();
    const [accounts, setAccounts] = useState<Wallet []>([]);
    const [portfolio, setPortfolio] = useState<UserPortfolioData | null>(null);
    const [userADDRESS, setUserADDRESS] = useState<'0x${string}' | undefined>();
    useEffect(() => {
        async function fetchUserData() {
            // Get user's accounts/wallets
            if (oktoClient) {
                // Get user's accounts/wallets
                const userAccounts = await getAccount(oktoClient);
                setAccounts(userAccounts);
                
                // Get user's portfolio
                const userPortfolio = await getPortfolio(oktoClient);
                setPortfolio(userPortfolio);

                
                // Safely access user address from accounts (assuming the first account is the primary one)
                const userAddress = userAccounts[0]?.address; // Get the first address as the user's address
                if (userAddress && /^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
                    setUserADDRESS(userAddress as '0x${string}'); // Cast to the correct type
                }
            } else {
                console.log("OktoClient is not available.");
            }
        }
 
        if (oktoClient) {
            fetchUserData();
        }
    }, [oktoClient]); 
 
    return (
        <div>
            {/* <h2>Welcome {userADDRESS}</h2>
            <h3>Your Accounts:</h3>
            {accounts.map(account => (
                <div key={account.caipId}>
                    <p>Network: {account.networkName}</p>
                    <p>Address: {account.address}</p>
                </div>
            ))}
        
            <h3>Portfolio:</h3>
            <pre>{JSON.stringify(portfolio, null, 2)}</pre> */}
        </div>
    );
}

