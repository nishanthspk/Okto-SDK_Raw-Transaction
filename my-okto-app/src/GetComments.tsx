
import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';

import { encodeFunctionData } from 'viem';



// RawTransaction component
export default function GetComments({ }) {
    const oktoClient = useOkto();


    // Function to handle the transaction
    const getComments = async () => {
        try {
            // 1. Define Contract Interaction
            const contractAddress = '0x02B139228Fe4CA03ca1E45df00aBD46D17450AFB'; // Replace with actual contract address
            const functionName = 'getComments'; // Replace with actual function name
            const functionArgs = [20,"world"]; // Pass input value as argument


            const functionData = encodeFunctionData({
                abi: [
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_bigint",
                                "type": "uint256"
                            }
                        ],
                        "name": "getComments",
                        "outputs": [
                            {
                                "components": [
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
                
                ] as const,
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

            const result = await evmRawTransaction(oktoClient, {
                caip2Id: 'eip155:84532', // Specify target chain
                transaction: {
                    from: "0xa4Ba62BA94EE81898aDE0276283BADdDD174C154",
                    to: contractAddress as '0x${string}',
                    data: functionData,
                },
            });
            console.log('====================================');
            console.log(result);
            console.log('====================================');
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











