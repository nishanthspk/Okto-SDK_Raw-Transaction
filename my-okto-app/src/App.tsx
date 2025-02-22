import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useOkto,evmRawTransaction } from "@okto_web3/react-sdk";
import { GoogleLogin } from "@react-oauth/google";
import { UserDashboard } from "./UserDashboard";
import { TokenTransfer } from "./TokenTransfer";

import RawTransaction from './RawTransaction';
import AddComment from './AddComment';
import GetNews from './GetNews';


declare global {
  interface Window {
    ethereum?: any;
  }
}


const App = () => {
  const oktoClient = useOkto();
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [newsId, setNewsId] = useState<string>("");
  const [newsContent, setNewsContent] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [newsPost, setNewsPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

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
      
          {/* <div className="bg-gradient-to-br from-white to-blue-100 shadow-xl rounded-xl p-10 w-full max-w-md border border-gray-300"> */}
            {/* <div className="mt-4">
              <textarea
                placeholder="What's happening?"
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                className="w-full p-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 shadow-md"
              />
              <button
                onClick={postNews}
                className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition font-bold shadow-md"
              >
                Post News
              </button>
            </div> */}
      
            {/* <div className="mt-4">
              <input
                type="text"
                placeholder="Search News ID"
                value={newsId}
                onChange={(e) => setNewsId(e.target.value)}
                className="w-full p-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 shadow-md mb-2"
              />
              <button
                onClick={postComment}
                className="w-full my-4 py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full hover:from-blue-500 hover:to-blue-700 transition mb-2 font-bold shadow-md"
              >
                Post Comments
              </button>
              <button
                onClick={getNews}
                className="w-full my-4 py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full hover:from-gray-300 hover:to-gray-500 transition mb-2 font-bold shadow-md"
              >
                Get News
              </button>
              <button
                onClick={getComments}
                className="w-full my-4 py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full hover:from-blue-500 hover:to-blue-700 transition mb-2 font-bold shadow-md"
              >
                Get Comments
              </button>
            </div> */}
      
            {/* {newsPost && (
              <div className="p-4 border border-gray-300 rounded-xl mt-2 bg-gradient-to-br from-white to-blue-100 shadow-md">
                <p className="font-bold text-blue-700">News #{newsPost.id}</p>
                <p>{newsPost.content}</p>
                <p className="text-sm text-gray-500">By: {newsPost.author}</p>
              </div>
            )}
      
            {comments.length > 0 && (
              <div className="p-4 border border-gray-300 rounded-xl mt-2 bg-gradient-to-br from-white to-blue-100 shadow-md">
                <h3 className="font-bold text-blue-600">Comments:</h3>
                {comments.map((c, index) => (
                  <div key={index} className="border-b border-gray-400 p-2 last:border-none">
                    <p>{c.content}</p>
                    <p className="text-sm text-gray-500">By: {c.commenter}</p>
                  </div>
                ))}
              </div>
            )} */}
          {/* </div> */}
      
          <TokenTransfer />
          <RawTransaction />
          <AddComment />
          <GetNews />
		  
        </div>
      );
};

export default App;

