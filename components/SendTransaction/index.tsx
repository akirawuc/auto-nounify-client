import * as React from 'react'
import { useDebounce } from 'use-debounce'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { utils } from 'ethers'

export default function DonateETH() {
  const [to, setTo] = React.useState('0xca84541D8B8Bf50fd8b042aCFd28B1e390703E20')

  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
      to: debouncedTo,
      value: debouncedAmount ? BigInt(utils.parseEther(debouncedAmount).toString()) : undefined,
  })
  const { data, sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

return (
    <div className="flex flex-col items-center">
        <form
          onSubmit={(e) => {
              e.preventDefault();
              sendTransaction?.();
          }}
          className='font-londrina flex items-center space-x-2 mb-6'
        >
          <span className="mr-2">Donate:</span>
          <input
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.05"
            value={amount}
            className="p-2 border border-gray-300 rounded"
          />
          <button 
            disabled={isLoading || !sendTransaction || !to || !amount} 
            className='bg-blue-500 text-white p-2 rounded'>
                {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {isSuccess && (
            <div className="text-center">
                Successfully donated {amount} ether, thank you!
                <div className="mt-4">
                    <a href={`https://etherscan.io/tx/${data?.hash}`} className="text-blue-500 underline">Etherscan</a>
                </div>
            </div>
        )}
    </div>
)
}
