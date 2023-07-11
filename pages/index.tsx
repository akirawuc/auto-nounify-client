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
import Link from 'next/link';

const { chains, publicClient } = configureChains(
  [polygon, optimism],
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


function Header() {
  return (
    <header style={{ position: 'sticky', top: 0 }}>
      <nav style={{ display: 'flex', justifyContent: 'center'}}>
        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
          <li style={{ margin: '0 10px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px'  }}>
            <Link href="/"> Nounify </Link>
          </li>
          <li style={{ margin: '0 10px' , border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
            <Link href="/quota">Buy some quota</Link>
          </li>
          {/* <li style={{ margin: '0 10px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px'  }}>
              <Link href="/claim">Claim revenue</Link> 
          </li> */}
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
  );
}

const SendTransaction = dynamic(() => import('../components/SendTransaction'), { ssr: false });
const RainbowKitProvider = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.RainbowKitProvider), { ssr: false });

const Home: NextPage = () => {
const { isConnected } = useAccount(); // Use the useAccount hook

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="p-4 flex justify-end items-center bg-white w-full">
                <nav style={{ display: 'flex', justifyContent: 'center'}}>
        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
          <li style={{ margin: '0 10px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px'  }}>
            <Link href="/"> Nounify </Link>
          </li>
          <li style={{ margin: '0 10px' , border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
            <Link href="/buyquota">Buy some quota</Link>
          </li>
          {/* <li style={{ margin: '0 10px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px'  }}>
              <Link href="/claim">Claim revenue</Link> 
          </li> */}
          {/* Add more links as needed */}
        </ul>
      </nav>

        <ConnectButton />
      </header>

        <h1 className='absolute top-20 w-full text-center font-londrina text-[5rem]'>
            Auto-Nounify your pictures!
        </h1>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      <main className="flex flex-col items-center space-y-4 mt-12">
        <div className="w-full max-w-xl px-4">
            {!isConnected && (
            <p className='text-center text-2xl font-londrina'>
                Connect your wallet to nounify!
            </p>)}
            {isConnected && (
          <Upload className='w-full  overflow-auto p-2 rounded'/>)}
        </div>

            {/*isConnected && <SendTransaction />*/} {/* Only display SendTransaction when the wallet is connected */}
      </main>
      </RainbowKitProvider>
    </WagmiConfig>



      <footer className="p-4 border-t flex justify-center items-center">
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
