import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Connection, PublicKey } from '@solana/web3.js';
import { setCurrentUser } from '../store/slices/userSlice';

const WalletButton: React.FC = () => {
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const onLoad = async () => {
      try {
        const { solana } = window as any;
        if (solana?.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          handleWalletConnection(response.publicKey.toString());
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    };

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        handleWalletConnection(response.publicKey.toString());
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const handleWalletConnection = async (address: string) => {
    try {
      const connection = new Connection('https://api.devnet.solana.com');
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);

      // Call your backend API to create/get user
      const response = await fetch('/api/v1/auth/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: address }),
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(setCurrentUser({
          ...userData,
          balance: balance / 1e9, // Convert lamports to SOL
        }));
      }
    } catch (error) {
      console.error('Error handling wallet connection:', error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-white"
    >
      {walletAddress ? `Connected: ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
};

export default WalletButton; 