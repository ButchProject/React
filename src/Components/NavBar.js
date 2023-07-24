// src/Components/NavBar.js
import React, { useState } from 'react';
import { Dock } from 'primereact/dock';
import '../Styles/NavBar.css';

function NavBar() {
  const [position] = useState('left');
  const items = [
    {
      label: 'Chat',
      icon: () => (
        <img
          alt='Chat'
          src='https://primefaces.org/cdn/primereact/images/dock/finder.svg'
          width='100%'
        />
      ),
      command: () => {
        window.location.href = '/chat';
      },
    },
    {
      label: 'Map',
      icon: () => (
        <img
          alt='Map'
          src='https://primefaces.org/cdn/primereact/images/dock/appstore.svg'
          width='100%'
        />
      ),
      command: () => {
        window.location.href = '/map';
      },
    },
    {
      label: 'Board',
      icon: () => (
        <img
          alt='Board'
          src='https://primefaces.org/cdn/primereact/images/dock/photos.svg'
          width='100%'
        />
      ),
      command: () => {
        window.location.href = '/board';
      },
    },

  ];
  
  return (
    <div className='dock-window'>
      <Dock model={items} position={position} />
    </div>
  );
}

export default NavBar;
