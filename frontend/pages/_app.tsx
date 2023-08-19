import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism } from 'wagmi/chains'
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from 'wagmi/providers/public';

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
