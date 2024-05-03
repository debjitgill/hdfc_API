import React, { useState, useEffect } from "react";
import Transaction from "../../transactionStatus";

const Login = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [payload, setPayload] = useState({
    virtual_address: "",
  });
  const [msg, setMsg] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {}, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://payment.sajagonline.com/vpacheck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponse(responseData);
        const token = responseData.token;
        sessionStorage.setItem("token", token);
        const decryptedResponse = responseData.decryptedResponse;
        if (
          decryptedResponse.includes(
            "Sorry, we are unable to process your request"
          )
        ) {
          setValid(false);
          setMsg("Failed");
        } else {
          setValid(true);
          setShowResponse(true);
        }
        
        setTimeout(() => {
          setShowResponse(false);
        }, 2000);
      } else {
        setMsg("Login Failed");
      }
    } catch (error) {
      console.error(error);
      setMsg("An error occurred during login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div
          style={{
            filter: showResponse ? "blur(5px)" : "none",
            transition: "filter 0.3s",
          }}
        >
          {!valid && (
            <form onSubmit={handleSubmit}>
              <br />
              <input
                type="text"
                className="form-control"
                name="virtual_address"
                value={payload.virtual_address}
                placeholder="Enter Virtual Address"
                onChange={handleChange}
              />
              <br />
              <button type="submit" className="btn btn-primary">
                submit
              </button>
              {<p className="text-center text-danger">{msg}</p>}
            </form>
          )}
          {valid && <Transaction />}
        </div>
      </div>
      {showResponse && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            backgroundColor: "black",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <p style={{ width: "200px", textAlign: "center" }}>
            {response.message}
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
