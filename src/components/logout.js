import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Logout = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("companyName");

  const handleConfirm = () => {
    localStorage.clear();
    localStorage.setItem(
      "companyName",
      "Welcome to Code Squad Accounting System v1.0"
    );
    window.location="/home";
  };

  const handleCancel = () => {
    window.location="/home";
  };

  const mystyle = {
    color: "white",
    backgroundColor: "#1f11a1",
    padding: "100px",
    fontFamily: "Arial",
    textAlign: "center",
    width: "100%",
  };

  const userStyle = {
    color: "white",
    paddingLeft: "100px",
  };

  return (
    <div>
      <div style={mystyle}>
        <h1>Click Confirm Button to Confirm Logout</h1>
        <p style={userStyle}>{name}</p>
      </div>

      <br />

      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <Button variant="danger" onClick={handleConfirm}>
          confirm
        </Button>

        <Button variant="outline-success" onClick={handleCancel}>
          cancel
        </Button>
      </div>
    </div>
  );
};

export default Logout;