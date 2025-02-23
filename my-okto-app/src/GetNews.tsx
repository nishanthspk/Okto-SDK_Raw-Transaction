
import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';
import { useState } from 'react';
import { encodeFunctionData } from 'viem';



export default function GetNews({ }) {
    const oktoClient = useOkto();

    const getNews = async () => {
        try {
            // 1. Define Contract Interaction
            const contractAddress = '0xeb0A42C64417114aDbb74f454110452eb0F3292e'; // Replace with actual contract address
            const functionName = 'getNews'; // Replace with actual function name
            const functionArgs = [20]; // Pass input value as argument

            const functionData = encodeFunctionData({
                abi: [
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
                    },] as const,
                functionName,
                args: functionArgs,
            });

            const rawTxParams = {
                caip2Id: 'eip155:84532', // Specify target chain
                transaction: {
                    from: "0xa4Ba62BA94EE81898aDE0276283BADdDD174C154",
                    to: contractAddress as '0x${string}',
                    data: functionData,
                },
            };

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

            <button onClick={getNews} className="w-full my-4 py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full hover:from-gray-300 hover:to-gray-500 transition mb-2 font-bold shadow-md">
                Get News
            </button>
        </div>
    );
};











