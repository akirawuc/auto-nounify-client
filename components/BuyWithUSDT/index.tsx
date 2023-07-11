import { useErc20BalanceOfRead, usePrepareErc20Transfer, useErc20Transfer } from '../../src/generated'
import React, { useState } from 'react';
import { Address, useAccount, useNetwork, useWaitForTransaction } from 'wagmi'
function PayWithUSDT() {
const {data, isLoading, isSuccess, write} =  useErc20Transfer({
  address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  functionName: 'transfer',
  args: ['0xEee968e1499655F36E0b059f2AcC114Bc8BBFcF9', '1000000000000000000'],
})
return (
    <div>
      <button onClick={() => write()}> Approve </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
)
}

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

function Transfer() {
  const [address, setAddress] = useState('0xEee968e1499655F36E0b059f2AcC114Bc8BBFcF9' as Address)
  const [amount, setAmount] = useState('')

  const { config, error, isError } = usePrepareErc20Transfer({
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address,
    args: address && amount ? [address, BigInt(amount)] : undefined,
    enabled: Boolean(address && amount),
  })
  const { data, write } = useErc20Transfer(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

    // If success, post the transaction hash to the server
    if (isSuccess) {
        fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash: data?.hash }),
        })
    }


  return (
    <div>
      Transfer:{' '}
      <input
        onChange={(e) => setAddress(e.target.value as Address)}
        placeholder="recipient address"
        value={address}
      />
      <input
        onChange={(e) => setAmount(e.target.value)}
        placeholder="amount (in wei)"
        value={amount}
      />
      <button disabled={!write} onClick={() => write?.()}>
        transfer
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      {isSuccess && <div>Success!</div>}
      {isError && <div>Error: {(error as BaseError)?.shortMessage}</div>}
    </div>
  )
}

export default Transfer;
