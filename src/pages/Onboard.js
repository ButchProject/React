import React from 'react';
import { useNavigate } from "react-router-dom";

const Onboard = () => {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Welcome to our website!</h1>
      <p>Please choose your path:</p>
      <button onClick={() => goToPage("/academyhome")}>Academy</button><br/>
      <button onClick={() => goToPage("/student")}>Student</button><br/>
      <button onClick={() => goToPage("/driver")}>Driver</button><br/>
    </div>
  );
}

export default Onboard;
