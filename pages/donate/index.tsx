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
        <div className="flex flex-col items-center pt-12">
            <h1 className='text-center font-londrina text-[5rem] mb-12'>
                Donate to support the project
            </h1>
            <DonateETH />
        </div>
    );
};

export default Home;
