// src/Components/NavBar.js
import React, { useState } from 'react';
import { Dock } from 'primereact/dock';
import '../Styles/NavBar.css';

function NavBar() {
    const [position] = useState('left');
    const items = [
      {
      label: 'Finder',
      icon: () => (
      <img
               alt='Finder'
               src='https://primefaces.org/cdn/primereact/images/dock/finder.svg'
               width='100%'
             />
      ),
      command: () => {
      window.location.href = '/finder';
      },
      },
      {
      label: 'App Store',
      icon: () => (
      <img
               alt='App Store'
               src='https://primefaces.org/cdn/primereact/images/dock/appstore.svg'
               width='100%'
             />
      ),
      command: () => {
      window.location.href = '/app-store';
      },
      },
      {
      label: 'Photos',
      icon: () => (
      <img
               alt='Photos'
               src='https://primefaces.org/cdn/primereact/images/dock/photos.svg'
               width='100%'
             />
      ),
      command: () => {
      window.location.href = '/photos';
      },
      },
      {
      label: 'Trash',
      icon: () => (
      <img
               alt='trash'
               src='https://primefaces.org/cdn/primereact/images/dock/trash.png'
               width='100%'
             />
      ),
      command: () => {
      window.location.href = '/register';
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
