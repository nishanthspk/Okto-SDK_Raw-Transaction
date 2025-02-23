// import { useOkto, getAccount,getPortfolio, tokenTransfer } from "@okto_web3/react-sdk";
// import { useState } from "react";

// export function TokenTransfer() {
//     const oktoClient = useOkto();
//     // const [status, setStatus] = useState("");
//     // const [summa, setData] = useState("");
//     // const [polygonAccount, setPolygonAccount] = useState<string | null>(null);
//     const [tnxstatus, settxnstatus] = useState<string | null>(null);
    
//     async function handleTransfer() {
//         try {
//             // Fetch user accounts
//             const accounts = await getAccount(oktoClient);

//             // // Find the account for POLYGON_TESTNET_AMOY network
//             // const polygonAccountData = accounts.find(account => account.networkName === "POLYGON");
//             const data = await getPortfolio(oktoClient);
//             console.log(data);
            
//             // setData(data.aggregatedData.holdingsCount)
//             // if (polygonAccountData) {
//             //     setPolygonAccount(polygonAccountData.address); // Set the fetched address
//             // } else {
//             //     setStatus("Polygon account not found.");
//             //     return;
//             // }

//             // Proceed with the token transfer (assuming the user account is found)
//             const response = await tokenTransfer(oktoClient, {
//                 amount: BigInt("1000000000"), // Amount of tokens to transfer (smallest unit)
//                 recipient: "0x758BE77a3eE14e7193730560daA07dd3fcBFD200",
//                 token: "", // Empty string for native token
//                 caip2Id: "eip155:137" // caip2id of Polygon Amoy
//             });
//             settxnstatus('Transfer complete! Hash: ${response}');
//             console.log(response); // Log the response to understand its structure
            
        
//         } catch (error: any) {
//             console.error("Transfer failed:", error);
//             setStatus('Transfer failed: ${error.message}');
//         }
//     }

//     return (
//         <div>
//             {/* <h2>Token Transfer</h2> */}
            
//             {/* Button to handle the transfer */}
//             {/* <button onClick={handleTransfer}>
//                 Send 1 POL
//             </button> */}
            
//             {/* Display user account address (Polygon Account) */}
//             {/* {polygonAccount ? (
//                 <p>Your Polygon Account: {polygonAccount}</p>
//             ) : (
//                 <p>No Polygon Account found.</p>
//             )} */}
            
//             {/* Display transfer status */}
//             <p>{tnxstatus}</p>
           
//         </div>
//     );
// }

