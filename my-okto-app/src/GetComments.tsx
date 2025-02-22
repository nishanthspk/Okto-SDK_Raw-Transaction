
import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';
import { useState } from 'react';
import { encodeFunctionData } from 'viem';


// RawTransaction component
export default function GetComments({}) {
  const oktoClient = useOkto();

  // State to manage input value and transaction result
  const [inputValue, setInputValue] = useState<number>();
  const [transactionResult, setTransactionResult] = useState<string | null>(null);
  const [newsContent, setNewsContent] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // Function to handle the transaction
  const getComments = async () => {
    try {
      // 1. Define Contract Interaction
      const contractAddress = '0xeb0A42C64417114aDbb74f454110452eb0F3292e'; // Replace with actual contract address
      const functionName = 'getComments'; // Replace with actual function name
      const functionArgs = [20]; // Pass input value as argument


      const functionData = encodeFunctionData({
        abi:[
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

const result = await evmRawTransaction(oktoClient, rawTxParams);
    }
  catch (error) {
      console.error("Transaction error:", error);
    }
  };


  return (

<div className="mt-4">
              
<button
                onClick={getComments}
                className="w-full my-4 py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full hover:from-blue-500 hover:to-blue-700 transition mb-2 font-bold shadow-md"
              >
                Get Comments
              </button>
            </div>
     );
};











