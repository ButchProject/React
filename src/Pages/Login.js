import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { ScrollTop } from 'primereact/scrolltop';
import '../Styles/Login.css';

export default function Login() {
  const [visible, setVisible] = useState(false);

  const introStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus1.png)`
  };

  const rectangle6Style = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus2.png)`
  };

  const rectangle18Style = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus3.png)`
  };

  return (
    <div className="login-container">
      <section className="section" id="intro" style={introStyle} />
      <section className="section" id="rectangle6" style={rectangle6Style} />
      <section className="section" id="rectangle18" style={rectangle18Style} />

      <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-full md:w-20rem lg:w-30rem">
        <h2>Login page</h2>
        <p>Login하세요!</p>
      </Sidebar>
      <div className="sidebar-button-container">
        <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} style={{ backgroundColor: 'white' }} />
      </div>

      <ScrollTop />
    </div>
  );
}
