import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Onboard.css";

const Onboard = () => {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="background">
      <img
        className="smalllogo"
        src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
        alt="slogo"
      />
      <img
        className="biglogo"
        src={`${process.env.PUBLIC_URL}/image/logo.png`}
        alt="blogo"
      />
      <img
        className="lcloud"
        src={`${process.env.PUBLIC_URL}/image/cloud-l.png`}
        alt="lcloud"
      />
      <img
        className="rcloud"
        src={`${process.env.PUBLIC_URL}/image/cloud-r.png`}
        alt="rcloud"
      />
      <img
        className="road"
        src={`${process.env.PUBLIC_URL}/image/road.png`}
        alt="road"
      />
      <div className="buttongroup">
        <button className="student" onClick={() => goToPage("/student")}>
          <div className="student-title">학생이신가요?</div>
          <img
            className="studentpic"
            src={`${process.env.PUBLIC_URL}/image/studentpic.png`}
            alt="studentpic"
          />
          <h1 className="student-title2">학생 HOME</h1>
          <div className="student-guide">
            같은 지역 학원들과 버스 노선을 공유하고 비용을 절약해보세요{" "}
          </div>
        </button>
        <button
          className="academyhome"
          onClick={() => goToPage("/academyhome")}
        >
          <div className="academy-title">학원을 운영하시나요?</div>
          <img
            className="academypic"
            src={`${process.env.PUBLIC_URL}/image/academypic.png`}
            alt="academypic"
          />
          <h1 className="academy-title2">학원 HOME</h1>
          <div className="academy-guide">
            같은 지역 학원들과 버스 노선을 공유하고 비용을 절약해보세요{" "}
          </div>
        </button>
        <button className="driver" onClick={() => goToPage("/driver")}>
          <div className="driver-title">학원 버스를 운영하시나요?</div>
          <img
            className="driverpic"
            src={`${process.env.PUBLIC_URL}/image/driverpic.png`}
            alt="driverpic"
          />
          <h1 className="driver-title2">기사 HOME</h1>
          <div className="driver-guide">
            같은 지역 학원들과 버스 노선을 공유하고 비용을 절약해보세요{" "}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Onboard;
