import { ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { mainnet, polygon, optimism } from 'wagmi/chains'
import type { NextPage } from 'next';
import React, { useState } from 'react';
import Upload from '../components/UploadButton';
import dynamic from 'next/dynamic';

import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism],
  [
    alchemyProvider({ apiKey: '2jMnGOXXyJ64NGMbgmlMMPkaZnaTeeiM' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: '2535c3721db1135963c87f1e589aa488',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const SendTransaction = dynamic(() => import('../components/SendTransaction'), { ssr: false });
const RainbowKitProvider = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.RainbowKitProvider), { ssr: false });

const Home: NextPage = () => {
const { isConnected } = useAccount(); // Use the useAccount hook

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="p-4 flex justify-end items-center bg-white w-full border-b">
          {/* <ConnectButton /> */}
      </header>

        <h1 className='absolute top-20 w-full text-center font-londrina text-[5rem]'>
            Auto-Nounify your pictures!
        </h1>

      <main className="flex flex-col items-center space-y-4 mt-12">
        <div className="w-full max-w-xl px-4">
          <Upload className='w-full h-64 overflow-auto border border-gray-300 p-2 rounded'/>
        </div>

      <RainbowKitProvider chains={chains}>
        <WagmiConfig config={wagmiConfig}>
            {/*isConnected && <SendTransaction />*/} {/* Only display SendTransaction when the wallet is connected */}
        </WagmiConfig>
      </RainbowKitProvider>
      </main>

      <footer className="p-4 border-t flex justify-center items-center">
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
