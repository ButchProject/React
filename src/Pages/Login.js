import React, { useState, useEffect } from 'react';
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

    // 스크롤 이벤트 처리 함수
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animation');
      const windowHeight = window.innerHeight;
  
      elements.forEach(function (element) {
        const positionFromTop = element.getBoundingClientRect().top;
  
        if (positionFromTop - windowHeight <= 0) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    };
  
    // 스크롤 이벤트 리스너 등록 및 해제
    useEffect(() => {
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  return (
    <div className="login-container">
      <section className="section" id="Pbus1" style={Pbus1} />

      <section className="section with-text image-centered scroll-animation" id="Pbus2" style={Pbus2}>
        <div className="text-box">
          <h2>서비스 설명1</h2>
          <p>설명설명</p>
          <p>설명설명</p>
          <p>설명설명</p>
        </div>
      </section>

      <section className="section with-text image-centered scroll-animation" id="Pbus3" style={Pbus3}>
        <div className="text-box">
          <h2>서비스 설명2</h2>
          <p>설명설명</p>
          <p>설명설명</p>
          <p>설명설명</p>
        </div>
      </section>

      <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-full md:w-20rem lg:w-30rem">
        <form className="login-form">
          <h2>Login Page</h2>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" autoComplete="off" />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" autoComplete="off" />
          <br />
          <Button type="submit" label="Login" onClick={() => setVisible(true)} />
        </form>
      </Sidebar>
      <div className="sidebar-button-container">
        <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} style={{ backgroundColor: 'white' }} />
      </div>

      <ScrollTop />
    </div>
  );
}
