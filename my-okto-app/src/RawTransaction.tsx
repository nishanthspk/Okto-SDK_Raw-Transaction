
import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';
import { useState } from 'react';
import { encodeFunctionData } from 'viem';


      
export  const RawTransaction = () =>  {

    const [inputValue, setInputValue] = useState<number>();
      const [transactionResult, setTransactionResult] = useState<string | null>(null);
      const [newsContent, setNewsContent] = useState<string>("");
      const [comment, setComment] = useState<string>("");
      const [newsId, setNewsId] = useState<string>("");
      const oktoClient = useOkto();

const postNews = async () => { 


try {


const contractAddress = '0xeb0A42C64417114aDbb74f454110452eb0F3292e'; // Replace with actual contract address
      const functionName = 'postNews'; // Replace with actual function name
      const functionArgs = ["hello"]; 
     
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
        args:functionArgs,
      });


      const rawTxParams = {
        caip2Id: 'eip155:84532', // Specify target chain
        transaction: {
          from: "0xa4Ba62BA94EE81898aDE0276283BADdDD174C154",
          to: contractAddress as `0x${string}`,
          data: functionData,
         
        },
      };

      // Execute the transaction (replace this with actual call to evmRawTransaction)
      const result = await evmRawTransaction(oktoClient,rawTxParams);
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

