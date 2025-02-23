
import { evmRawTransaction, useOkto } from '@okto_web3/react-sdk';
import { useState } from 'react';
import { encodeFunctionData } from 'viem';

export default function addComments({ }) {
    const oktoClient = useOkto();
    const [comment, setComment] = useState<string>("");

    const addComment = async () => {
        try {
            // 1. Define Contract Interaction
            const contractAddress = '0x02B139228Fe4CA03ca1E45df00aBD46D17450AFB'; // Replace with actual contract address
            const functionName = 'addComment'; // Replace with actual function name
            const functionArgs = [6, "hi"]; // Pass input value as argument


            const functionData = encodeFunctionData({
                abi: [
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_bigint",
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

            const result = await evmRawTransaction(oktoClient,  {
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











