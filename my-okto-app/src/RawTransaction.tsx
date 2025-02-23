import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';
import { useState } from 'react';
import { encodeFunctionData, decodeFunctionData } from 'viem';
import { createPublicClient, http } from "viem";
import { optimism } from "viem/chains";


export const RawTransaction = () => {

  const [newsContent, setNewsContent] = useState("");
  const [newsId, setNewsId] = useState<string>("");
  const oktoClient = useOkto();
  const client = createPublicClient({
    chain: optimism,
    transport: http(),
  });

  const postNews = async () => {
    try {


      const contractAddress = '0xeb0A42C64417114aDbb74f454110452eb0F3292e'; // Replace with actual contract address
      const functionName = 'postNews'; // Replace with actual function name
      const functionArgs = ["Hello"];

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
        functionName,
        data: functionData,
      });


      console.log("Decoded Function Name:", functionName);
      console.log("Decoded Parameters:", decodedData);
      console.log("Full Decoded Output:", JSON.stringify(decodedData, null, 2));

      console.log("Function Data:", functionData);
      console.log("Raw Transaction Params:", rawTxParams);

      // Execute the transaction (replace this with actual call to evmRawTransaction)
      const result = await evmRawTransaction(oktoClient, rawTxParams);
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

