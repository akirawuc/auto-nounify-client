import Link from 'next/link';
import { ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';

function PageHeader() {
  return (
  <header className="p-4 flex justify-end items-center bg-white w-full">
    <nav style={{ display: 'flex', justifyContent: 'center'}}>
        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
          <li style={{ margin: '0 10px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px'  }}>
            <Link href="/"> Nounify </Link>
          </li>
          <li style={{ margin: '0 10px' , border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
            <Link href="/buyquota">Buy some quota</Link>
          </li>
        </ul>
      </nav>

        <ConnectButton />
    </header>
  );
}

export default PageHeader;
