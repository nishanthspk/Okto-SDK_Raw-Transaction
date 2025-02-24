import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';
import { useState } from 'react';
import { encodeFunctionData, decodeFunctionData } from 'viem';



export const RawTransaction = () => {

  const [newsContent, setNewsContent] = useState("");
  const [newsId, setNewsId] = useState<string>("");
  const oktoClient = useOkto();


  const postNews = async () => {
    try {
      const contractAddress = '0x02B139228Fe4CA03ca1E45df00aBD46D17450AFB'; // Replace with actual contract address
      const functionName = 'postNews'; // Replace with actual function name
      const functionArgs:readonly [string] = ["Hello"];
      const functionData = encodeFunctionData({
        abi: [

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
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "bigint",
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
                "name": "bigint",
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
        
        ],
        functionName,
        args: functionArgs,
      });
      console.log("Encoded Function Data:", functionData);

      const rawTxParams = {
        caip2Id: 'eip155:84532', // Specify target chain
        transaction: {
          from: "0xa4Ba62BA94EE81898aDE0276283BADdDD174C154",
          to: contractAddress as `0x${string}`,
          data: functionData,

        },
      };

      console.log("Encoded Function Data:", functionData);
      const decodedData = decodeFunctionData({
        abi: [

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
        ],
       
        data: functionData,
      });


      console.log("Decoded Function Name:", functionName);
      console.log("Decoded Parameters:", decodedData);
      console.log("Full Decoded Output:", JSON.stringify(decodedData, null, 2));

      console.log("Function Data:", functionData);
      console.log("Raw Transaction Params:", rawTxParams);

      // Execute the transaction (replace this with actual call to evmRawTransaction)
      const result = await evmRawTransaction(oktoClient,{
        caip2Id: 'eip155:84532', // Specify target chain
        transaction: {
          from: "0xa4Ba62BA94EE81898aDE0276283BADdDD174C154",
          to: contractAddress as `0x${string}`,
          data: functionData,

        },
      });
      console.log("Transaction success:", result);

    }
    catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search News ID"
        value={newsId}
        onChange={(e) => setNewsId(e.target.value)}
        className="w-full p-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 shadow-md mb-2"
      />
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
    </div>
  );

};

export default RawTransaction;

