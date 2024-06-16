'use client';

import React from 'react';

import HashLoader from 'react-spinners/HashLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import PuffLoader from 'react-spinners/PuffLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';

export const Cliploader = () => <ClipLoader color="#fff" size="18px" />;

export const Puffloader = () => (
  <span className="fixed bg-black/35 z-10 h-full w-full flex items-center justify-center">
    <PuffLoader color="#000000" />
  </span>
);

export const Scaleloader = () => (
  <span className="my-6">
    <ScaleLoader color="#007CA5" />
  </span>
);

export const Loader = () => (
  <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
    <HashLoader color="#36d7b7" />
  </div>
);
