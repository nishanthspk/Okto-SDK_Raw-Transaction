import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useOkto,evmRawTransaction } from "@okto_web3/react-sdk";
import { GoogleLogin } from "@react-oauth/google";
import { UserDashboard } from "./UserDashboard";
import { TokenTransfer } from "./TokenTransfer";
import RawTransaction from './RawTransaction';
import AddComment from './AddComment';
import GetNews from './GetNews';
import GetComments from "./GetComments";

declare global {
  interface Window {
    ethereum?: any;
  }
}


const App = () => {
  const oktoClient = useOkto();
  const [account, setAccount] = useState<string | null>(null);


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

  const CONTRACT_ADDRESS = "0xeb0A42C64417114aDbb74f454110452eb0F3292e";

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newsId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			}
		],
		"name": "addComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newsId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "commenter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "CommentAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "NewsPosted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			}
		],
		"name": "postNews",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "comments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "newsId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "commenter",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newsId",
				"type": "uint256"
			}
		],
		"name": "getComments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "newsId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "commenter",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct TwitterNews.Comment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getNews",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct TwitterNews.NewsPost",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newsCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "newsPosts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask.");
        return;
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const signer = await web3Provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      setProvider(web3Provider);
      setContract(contractInstance);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };



      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 p-6 text-black">
          <h1 className="font-extrabold text-3xl">Raw Transaction</h1>
          <div className="flex justify-between items-center w-full">
            <div className="mr-[100px]">
              {oktoClient.userSWA ? (
                <UserDashboard />
              ) : (
                <GoogleLogin onSuccess={handleGoogleLogin} />
              )}
            </div>
      
            <div>
              {!account ? (
                <button
                  onClick={connectWallet}
                  className="w-full py-3 my-3 px-15 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition font-bold shadow-md"
                >
                  Connect Wallet
                </button>
              ) : (
                <p className="text-blue-700 font-bold text-center mt-2">Wallet Connected</p>
              )}
            </div>
          </div>
      
          <TokenTransfer />
          <RawTransaction />
          <AddComment />
          <GetNews />
          <GetComments />
		  
        </div>
      );
};

export default App;

