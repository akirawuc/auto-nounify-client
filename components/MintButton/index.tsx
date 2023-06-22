import React, { useState } from 'react';
import { utils, Contract } from 'ethers';
import { useRainbowSelector, useWalletConnect } from '@rainbow-me/rainbowkit';

const MintNFTButton = () => {
  const [value, setValue] = useState('');
  const { account, sendTransaction } = useWalletConnect();
  const selectedWallet = useRainbowSelector((state) => state.wallets.selected);

  const mintNFT = async () => {
    const contractABI = '';
    const contractAddress = '';

    const contract = new Contract(contractAddress, contractABI, selectedWallet);
    const valueInWei = utils.parseEther(value);

    try {
      const tx = await contract.mint(account, { value: valueInWei });
      await tx.wait();

      alert('NFT successfully minted!');
    } catch (err) {
      console.error('Error minting NFT:', err);
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
};

export default MintNFTButton;
