const contract_address = "0x7dB444d0E2Da0E513AB3a704FD5EEC444B8FABFd"
const contract_abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "SquadCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "UnitCreated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "CurrencyProvider",
        "outputs": [
            {
                "internalType": "contract StoreToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
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
                "name": "_auctionId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "bid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_auctionId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_msg",
                "type": "string"
            }
        ],
        "name": "bid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum UnitType",
                "name": "_type",
                "type": "uint8"
            }
        ],
        "name": "buyUnit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum UnitType",
                "name": "_type",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "buyUnit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_auctionId",
                "type": "uint256"
            }
        ],
        "name": "claimAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_auctionId",
                "type": "uint256"
            }
        ],
        "name": "getAssetIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAuctionCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAuctions",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "highestBid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "assetIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "address",
                        "name": "highestBidder",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "host",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "highestBidText",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Auction[]",
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
                "name": "squadId",
                "type": "uint256"
            }
        ],
        "name": "getSquad",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256[]",
                        "name": "unitIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint16",
                        "name": "stashedTokens",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "deployTime",
                        "type": "uint16"
                    }
                ],
                "internalType": "struct Squad",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum DeploymentState",
                "name": "_tier",
                "type": "uint8"
            }
        ],
        "name": "getSquadIdsInTier",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "squadIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "squadId",
                "type": "uint256"
            }
        ],
        "name": "getSquadOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "squadId",
                "type": "uint256"
            }
        ],
        "name": "getSquadState",
        "outputs": [
            {
                "internalType": "enum DeploymentState",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "squadId",
                "type": "uint256"
            }
        ],
        "name": "getSquadUnitIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getSquads",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256[]",
                        "name": "unitIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint16",
                        "name": "stashedTokens",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "deployTime",
                        "type": "uint16"
                    }
                ],
                "internalType": "struct Squad[]",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getToken",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint16",
                        "name": "power",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "defence",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "level",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "health",
                        "type": "uint16"
                    },
                    {
                        "internalType": "enum UnitType",
                        "name": "utype",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct Unit",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "unitId",
                "type": "uint256"
            }
        ],
        "name": "getUnitState",
        "outputs": [
            {
                "internalType": "enum UnitState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "squadCount",
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
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "squadsOf",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "squadIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_assets",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "_asking",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            }
        ],
        "name": "startAuction",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "auctionId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_unitIds",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "targetId",
                "type": "uint256"
            }
        ],
        "name": "targetedChallenge",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "squadId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "tokensOfOwner",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_auctionId",
                "type": "uint256"
            }
        ],
        "name": "withdrawAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]