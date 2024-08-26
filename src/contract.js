import { ethers } from 'ethers';

const contractAddress = '0x3c725134d74D5c45B4E4ABd2e5e2a109b5541288'; // Your contract address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum CoinFlipGame.Outcome",
				"name": "result",
				"type": "uint8"
			}
		],
		"name": "CoinFlipped",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "flipCoin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "lastResult",
		"outputs": [
			{
				"internalType": "enum CoinFlipGame.Outcome",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let contract;

export const getContract = (signer) => {
  if (!contract) {
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  }
  return contract;
};

