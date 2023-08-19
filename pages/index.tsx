import type { NextPage } from 'next';
import React, { useState } from 'react';
import Upload from '../components/UploadButton';
import "@rainbow-me/rainbowkit/styles.css";
import Link from 'next/link';

const Home: NextPage = () => {

  return (
      <>
        <div className="flex flex-col items-center justify-center">
        <h1 className='text-center font-londrina text-[5rem] mb-12'>
            Auto-Nounify your pictures!
        </h1>
          <Upload className="justify-center"/>
    </div>
      </>
  );
};

export default Home;
