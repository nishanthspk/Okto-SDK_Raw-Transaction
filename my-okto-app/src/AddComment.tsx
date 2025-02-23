
import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';
import { useState } from 'react';
import { encodeFunctionData } from 'viem';


// RawTransaction component
export default function addComments({}) {
  const oktoClient = useOkto();

  // State to manage input value and transaction result
  const [inputValue, setInputValue] = useState<number>();
  const [transactionResult, setTransactionResult] = useState<string | null>(null);
  const [newsContent, setNewsContent] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // Function to handle the transaction
  const addComment = async () => {
    try {
      // 1. Define Contract Interaction
      const contractAddress = '0xeb0A42C64417114aDbb74f454110452eb0F3292e'; // Replace with actual contract address
      const functionName = 'addComment'; // Replace with actual function name
      const functionArgs = [6,"hi"]; // Pass input value as argument


      const functionData = encodeFunctionData({
        abi:[
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
        },]as const,
        functionName,
        args: functionArgs,
      });

      const rawTxParams = {
        caip2Id: 'eip155:84532', // Specify target chain
        transaction: {
          from: "0xa4Ba62BA94EE81898aDE0276283BADdDD174C154",
          to: contractAddress as '0x${string}',
          data: functionData,
        },};

        console.log("Function Data:", functionData);
        console.log("Raw Transaction Params:", rawTxParams);

const result = await evmRawTransaction(oktoClient, rawTxParams);
    }
  catch (error) {
      console.error("Transaction error:", error);
    }
  };


  return (
<div className="mt-4">
              

              <div className='mt-4'>

              <textarea
                placeholder="Give Some Comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 shadow-md"
              />
              <button
                onClick={addComment}
                className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition font-bold shadow-md"
              >
                Post Comments
              </button>
              </div>
            </div>
     );
};











