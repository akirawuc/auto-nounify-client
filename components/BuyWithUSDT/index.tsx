import { usePrepareErc20Transfer, useErc20Transfer } from '../../src/generated'
import {BaseError} from 'viem';
import React, { useState, useEffect } from 'react';
import { Address, useAccount, useNetwork, useWaitForTransaction } from 'wagmi'

function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork()
  const etherscan = chain?.blockExplorers?.etherscan
  return (
    <span>
      Processing transaction...{' '}
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
      )}
    </span>
  )
}

function PayWithUSDT() {
  const [address, setAddress] = useState('0xEee968e1499655F36E0b059f2AcC114Bc8BBFcF9' as Address)
  const [amount, setAmount] = useState('')
    const [isIncreased, setIsIncreased] = useState(false);
    const [isPosted, setIsPosted] = useState(false); // New state variable


  const { config, error, isError } = usePrepareErc20Transfer({
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address,
    args: address && amount ? [address, BigInt(Number(amount)*1000000)] : undefined,
    enabled: Boolean(address && Number(amount)*1000000),
  })
  const { data, write } = useErc20Transfer(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

    // If success, post the transaction hash to the server
    // prevent multiple posts by checking isSuccess
      useEffect(() => {
        if (isSuccess && !isPosted) {
          fetch('https://us-central1-fleet-surface-347907.cloudfunctions.net/decode_add_quota', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transactionHash: data?.hash }),
          })
            .then(() => {
              setIsPosted(true); // Mark the transaction as posted
            })
            .catch((error) => {
              console.error('Failed to post transaction:', error);
            });
        }
      }, [isSuccess, isPosted, data]);


  return (
    <div className='font-londrina'>
      Transfer:{' '}
      <input
        onChange={(e) => setAmount(e.target.value)}
        placeholder="amount"
        value={amount}
      />
      <button disabled={!write} onClick={() => write?.()} className='bg-blue-500 text-white p-2 rounded'>
        transfer
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      {isSuccess && <div>Success!</div>}
      {isError && <div>Error: {(error as BaseError)?.shortMessage}</div>}
    </div>
  )
}

export default PayWithUSDT;
