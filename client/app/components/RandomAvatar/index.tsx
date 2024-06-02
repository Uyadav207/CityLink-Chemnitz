"use client"

import React from 'react';
import Avatar from 'boring-avatars';

type RandomAvatarProps = {
  name: string;
};

const RandomAvatar: React.FC<RandomAvatarProps> = ({ name }) => {

  const variants: string[] = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'];
  const randomVariant: any = variants[Math.floor(Math.random() * variants.length)];


  const palettes = [
    ['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059'],
    ['#FF6347', '#FF4500', '#FFD700', '#8A2BE2', '#00CED1'],
    ['#FFE4E1', '#98FB98', '#AFEEEE', '#DB7093', '#FFDAB9'],
  ];
  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

  return (
    <Avatar
      size={30} // Size of the avatar
      name={name}
      variant={randomVariant}
      colors={randomPalette}
    />
  );
};

export default RandomAvatar;
