const collectionAbi = {
    "ABI version": 2,
    "data": [
        {
            "key": 1,
            "name": "nonce_",
            "type": "uint64"
        }
    ],
    "events": [
        {
            "inputs": [
                {
                    "name": "_sender",
                    "type": "address"
                },
                {
                    "name": "_index",
                    "type": "uint8"
                },
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "NftTypeAdded",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "_sender",
                    "type": "address"
                },
                {
                    "name": "_index",
                    "type": "uint8"
                },
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "NftTypeUpdated",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "_sender",
                    "type": "address"
                },
                {
                    "name": "_index",
                    "type": "uint8"
                },
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "NftTypeDeleted",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "nftId",
                    "type": "uint256"
                },
                {
                    "name": "nftAddress",
                    "type": "address"
                },
                {
                    "name": "oldTypeName",
                    "type": "string"
                },
                {
                    "name": "newTypeName",
                    "type": "string"
                }
            ],
            "name": "NftTypeNameChanged",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "nftId",
                    "type": "uint256"
                },
                {
                    "name": "nftAddress",
                    "type": "address"
                },
                {
                    "name": "oldNickName",
                    "type": "string"
                },
                {
                    "name": "newNickName",
                    "type": "string"
                }
            ],
            "name": "NftNickNameChanged",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "oldOwner",
                    "type": "address"
                },
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "outputs": []
        },
        {
            "inputs": [],
            "name": "CollectionMetadataUpdated",
            "outputs": []
        },
        {
            "inputs": [],
            "name": "NftMetadataUpdated",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "name": "nft",
                    "type": "address"
                },
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "manager",
                    "type": "address"
                },
                {
                    "name": "creator",
                    "type": "address"
                }
            ],
            "name": "NftCreated",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "name": "nft",
                    "type": "address"
                },
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "manager",
                    "type": "address"
                }
            ],
            "name": "NftBurned",
            "outputs": []
        }
    ],
    "fields": [
        {
            "name": "_pubkey",
            "type": "uint256"
        },
        {
            "name": "_timestamp",
            "type": "uint64"
        },
        {
            "name": "_constructorFlag",
            "type": "bool"
        },
        {
            "name": "_supportedInterfaces",
            "type": "optional(cell)"
        },
        {
            "name": "_codeNft",
            "type": "cell"
        },
        {
            "name": "_totalSupply",
            "type": "uint128"
        },
        {
            "name": "baseNftUrl",
            "type": "string"
        },
        {
            "name": "collectionUrl_",
            "type": "string"
        },
        {
            "name": "_codeIndex",
            "type": "cell"
        },
        {
            "name": "_codeIndexBasis",
            "type": "cell"
        },
        {
            "name": "_indexDeployValue",
            "type": "uint128"
        },
        {
            "name": "_indexDestroyValue",
            "type": "uint128"
        },
        {
            "name": "_deployIndexBasisValue",
            "type": "uint128"
        },
        {
            "name": "owner_",
            "type": "address"
        },
        {
            "name": "nonce_",
            "type": "uint64"
        },
        {
            "name": "_totalMinted",
            "type": "uint256"
        },
        {
            "name": "_remainOnNft",
            "type": "uint128"
        },
        {
            "name": "mintNftStatus",
            "type": "uint8"
        },
        {
            "name": "nftTypes",
            "type": "map(uint8,string)"
        }
    ],
    "functions": [
        {
            "inputs": [
                {
                    "name": "codeNft",
                    "type": "cell"
                },
                {
                    "name": "codeIndex",
                    "type": "cell"
                },
                {
                    "name": "codeIndexBasis",
                    "type": "cell"
                },
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "remainOnNft",
                    "type": "uint128"
                },
                {
                    "name": "baseNftUrl",
                    "type": "string"
                },
                {
                    "name": "collectionUrl",
                    "type": "string"
                },
                {
                    "name": "genesisNftOwner",
                    "type": "address"
                },
                {
                    "name": "genesisNickName",
                    "type": "string"
                }
            ],
            "name": "constructor",
            "outputs": []
        },
        {
            "inputs": [],
            "name": "codeDepth",
            "outputs": [
                {
                    "name": "value0",
                    "type": "uint16"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "collection",
                    "type": "address"
                },
                {
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "resolveIndexCodeHash",
            "outputs": [
                {
                    "name": "hash",
                    "type": "uint256"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "parentNftId",
                    "type": "uint256"
                },
                {
                    "name": "parentNftAddress",
                    "type": "address"
                },
                {
                    "name": "nftTypeIndex",
                    "type": "uint8"
                },
                {
                    "name": "nickName",
                    "type": "string"
                }
            ],
            "name": "mintNftByType",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "totalMinted",
            "outputs": [
                {
                    "name": "count",
                    "type": "uint256"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "mintNftStatus_",
                    "type": "uint8"
                }
            ],
            "name": "setMinitingStatus",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "remainOnNft",
                    "type": "uint128"
                }
            ],
            "name": "setRemainOnNft",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "getRemainOnNft",
            "outputs": [
                {
                    "name": "remainOnNft",
                    "type": "uint256"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "nftId",
                    "type": "uint256"
                },
                {
                    "name": "nftAddress",
                    "type": "address"
                },
                {
                    "name": "nftTypeIndex",
                    "type": "uint8"
                }
            ],
            "name": "changeNftTypeName",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "nftId",
                    "type": "uint256"
                },
                {
                    "name": "newNftTypeName",
                    "type": "string"
                },
                {
                    "name": "oldNftTypeName",
                    "type": "string"
                }
            ],
            "name": "acceptNftTypeNameChange",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "nftId",
                    "type": "uint256"
                },
                {
                    "name": "nftAddress",
                    "type": "address"
                },
                {
                    "name": "nickName",
                    "type": "string"
                }
            ],
            "name": "changeNftNickName",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "nftId",
                    "type": "uint256"
                },
                {
                    "name": "newNftNickName",
                    "type": "string"
                },
                {
                    "name": "oldNftNickName",
                    "type": "string"
                },
                {
                    "name": "sendRemainGasTo",
                    "type": "address"
                }
            ],
            "name": "acceptNftNickNameChange",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                },
                {
                    "name": "index",
                    "type": "uint8"
                }
            ],
            "name": "getNftType",
            "outputs": [
                {
                    "name": "value0",
                    "type": "optional(string)"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "getAllNftTypesIndexes",
            "outputs": [
                {
                    "name": "value0",
                    "type": "uint8[]"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                },
                {
                    "name": "index",
                    "type": "uint8"
                }
            ],
            "name": "isNftTypeExists",
            "outputs": [
                {
                    "name": "value0",
                    "type": "bool"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "index",
                    "type": "uint8"
                },
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "addUpdateNftType",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "index",
                    "type": "uint8"
                }
            ],
            "name": "deleteNftType",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "_baseNftUrl",
                    "type": "string"
                }
            ],
            "name": "setBaseUrl",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "_url",
                    "type": "string"
                }
            ],
            "name": "setCollectionUrl",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "withdrawBalance",
            "outputs": []
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "value0",
                    "type": "address"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "indexBasisCode",
            "outputs": [
                {
                    "name": "code",
                    "type": "cell"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "indexBasisCodeHash",
            "outputs": [
                {
                    "name": "hash",
                    "type": "uint256"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "resolveIndexBasis",
            "outputs": [
                {
                    "name": "indexBasis",
                    "type": "address"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "indexCode",
            "outputs": [
                {
                    "name": "code",
                    "type": "cell"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "indexCodeHash",
            "outputs": [
                {
                    "name": "hash",
                    "type": "uint256"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "getCollectionUrl",
            "outputs": [
                {
                    "name": "collectionUrl",
                    "type": "string"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                },
                {
                    "name": "parts",
                    "type": "cell"
                }
            ],
            "name": "getNftUrl",
            "outputs": [
                {
                    "name": "nftUrl",
                    "type": "string"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "count",
                    "type": "uint128"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "nftCode",
            "outputs": [
                {
                    "name": "code",
                    "type": "cell"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                }
            ],
            "name": "nftCodeHash",
            "outputs": [
                {
                    "name": "codeHash",
                    "type": "uint256"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                },
                {
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "nftAddress",
            "outputs": [
                {
                    "name": "nft",
                    "type": "address"
                }
            ]
        },
        {
            "inputs": [
                {
                    "name": "answerId",
                    "type": "uint32"
                },
                {
                    "name": "interfaceID",
                    "type": "uint32"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "name": "value0",
                    "type": "bool"
                }
            ]
        },
        {
            "inputs": [],
            "name": "mintNftStatus",
            "outputs": [
                {
                    "name": "mintNftStatus",
                    "type": "uint8"
                }
            ]
        }
    ],
    "header": [
        "pubkey",
        "time",
        "expire"
    ],
    "version": "2.2"
} as const

export default collectionAbi;