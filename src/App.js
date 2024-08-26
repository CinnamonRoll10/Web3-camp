import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract, connectWallet } from './contract';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  // Connect wallet
  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        
        setProvider(provider);
        setWalletAddress(userAddress);

        // Initialize contract
        const contract = getContract(signer);
        setContract(contract);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  // Start coin flip game
  const startGame = async () => {
    if (contract) {
      try {
        const tx = await contract.flipCoin();
        await tx.wait();
        const result = await contract.lastResult();
        setGameResult(result === 0 ? 'Heads' : 'Tails');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="App">
      <h1>Coin Flip Game</h1>
      <button onClick={connectWalletHandler}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect Wallet'}
      </button>
      <button onClick={startGame} disabled={!walletAddress}>
        Start Game
      </button>
      {gameResult && <p>Game Result: {gameResult}</p>}
    </div>
  );
}

export default App;
