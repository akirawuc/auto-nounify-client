import * as React from 'react'
import { useDebounce } from 'use-debounce'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { utils } from 'ethers'

export default function SendTransaction() {
  const [to, setTo] = React.useState('0xca84541D8B8Bf50fd8b042aCFd28B1e390703E20')

const [debouncedTo] = useDebounce(to, 500)
  // console.log('debouncedTo:', debouncedTo); // Log the debouncedTo value


  const [amount, setAmount] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)
  // console.log('debouncedAmount:', debouncedAmount); // Log the debouncedAmount value

  const { config } = usePrepareSendTransaction({
      to: debouncedTo,
      value: debouncedAmount ? BigInt(utils.parseEther(debouncedAmount).toString()) : undefined,
  })
  // console.log('usePrepareSendTransaction config:', config); // Log the output of usePrepareSendTransaction

  const { data, sendTransaction } = useSendTransaction(config)
  // console.log('useSendTransaction data:', data); // Log the output of useSendTransaction
  // console.log('useSendTransaction sendTransaction:', sendTransaction);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        sendTransaction?.()
      }}
    >
      <input
        aria-label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.05"
        value={amount}
      />
      <button disabled={isLoading || !sendTransaction || !to || !amount}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  )
}
