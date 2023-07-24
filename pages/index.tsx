import type { NextPage } from 'next';
import React, { useState } from 'react';
import Upload from '../components/UploadButton';
import "@rainbow-me/rainbowkit/styles.css";
import Link from 'next/link';

const Home: NextPage = () => {

  return (
      <>
        <h1 className='text-center font-londrina text-[5rem] mb-12'>
            Auto-Nounify your pictures!
        </h1>
<section className="flex flex-col items-center justify-center min-h-screen pt-0 mt-[-100px]">
        <div>
              <Upload className='w-full  overflow-auto p-2 rounded'/>
        </div>
      </section>
  </>
  );
};

export default Home;
