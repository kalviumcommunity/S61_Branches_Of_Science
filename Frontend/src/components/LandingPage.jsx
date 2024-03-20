import { useState } from "react";
import logo from "../assets/logo-transparent-svg.svg";
import "./LandingPage.css";
import Entity from "./Entity";

const LandingPage = () => {
  const [prov, setProv] = useState(false)
  const handleClick = () => {
    setProv(true)
  }

  return (
    <div className="landing-page">
      <nav>
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </nav>
      <div className="main-container">
        <h1>Welcome to Branches of Science!!!</h1>
        <p
          style={{
            fontSize: "25px",
            color: "black",
            borderRadius: "20px",
            padding: "10px ",
            marginTop: "15px",
          }}
        >
          Explore various types of sciences and find your passion🧪🔬🔭
        </p>
        <div className="btn-container">
        {
          prov ? <Entity /> : <button className="button-86" role="button" onClick={handleClick}>Start your exploration</button>
        }
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
