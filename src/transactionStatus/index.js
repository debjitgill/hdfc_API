import React, { useState, useEffect } from "react";

const TransactionStatus = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [extractedValue,setExtractedValue] = useState("")
  const [payload, setPayload] = useState({
    payerVA: "",
    amount: "",
  });
  const [msg, setMsg] = useState("");
  const [valid, setValid] = useState(false);
  useEffect(() => {}, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://payment.sajagonline.com/initiateTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setResponse(responseData);
        const dataParts = responseData.data.split("|"); // Corrected line
        const extractedValue = dataParts[1];
        setExtractedValue(extractedValue)
        console.log(extractedValue);
        const token = responseData.token;
        sessionStorage.setItem("token", token);
        setMsg(responseData.msg);
        setShowResponse(true);
        setTimeout(() => {
          setShowResponse(false);
          setValid(true);
        }, 4000);
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
            <form onSubmit={handleSubmit} className="">
              <input
                type="text"
                className="form-control mb-3"
                name="payerVA"
                value={payload.payerVA}
                placeholder="Enter User Virtual Address"
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                name="amount"
                value={payload.amount}
                placeholder="Enter Amount"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary">
                submit
              </button>

              {<p className="text-center">{msg}</p>}
            </form>
          )}
          {valid && <p>Thank You </p>}
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
            {response.message}<br/>
            {`Your Transaction Reference Id : ${extractedValue}`}
          </p>
        </div>
      )}
    </>
  );
};

export default TransactionStatus;
