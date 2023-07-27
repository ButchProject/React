import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { ScrollTop } from 'primereact/scrolltop';
import '../Styles/Login.css';

export default function Login() {
  const [visible, setVisible] = useState(false);

  const Pbus1 = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus1.png)`
  };

  const Pbus2 = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus2.png)`
  };

  const Pbus3 = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus3.png)`
  };

  return (
    <div className="login-container">
      <section className="section" id="Pbus1" style={Pbus1} />

      
      <section className="section with-text image-centered" id="Pbus2" style={Pbus2}>
        <div className="text-box">
          <h2>서비스 설명1</h2>
          <p>설명설명</p>
          <p>설명설명</p>
          <p>설명설명</p>
        </div>
      </section>
      
      <section className="section with-text image-centered" id="Pbus3" style={Pbus3}>
        <div className="text-box">
          <h2>서비스 설명2</h2>
          <p>설명설명</p>
          <p>설명설명</p>
          <p>설명설명</p>
        </div>
      </section>

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
