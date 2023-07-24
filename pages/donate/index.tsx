import { ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { mainnet, arbitrum, optimism } from 'wagmi/chains'
import type { NextPage } from 'next';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import  DonateETH from '../../components/SendTransaction';
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Link from 'next/link';

const Home: NextPage = () => {
const { isConnected } = useAccount(); // Use the useAccount hook

  return (
    <div className="min-h-screen flex flex-col justify-between">

        <h1 className='absolute top-20 w-full text-center font-londrina text-[5rem]'>
            Donate the project
        </h1>
      <div className="flex flex-col items-center space-y-16 mt-12">
        <DonateETH />
      </div>
    </div>
  );
};

export default Home;
