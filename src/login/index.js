import React, { useState,useEffect } from "react";

const Login = () => {
  const [payload, setPayload] = useState({
    merchant_id: "",
    merchant_ref_no: "",
    virtual_address: "",
    transaction_status: "T",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    
  }, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/vpacheck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // Parse the response as JSON
        const responseData = await response.json();

        const token = responseData.token;
        sessionStorage.setItem("token", token);

        setMsg(responseData.msg);
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="merchant_id"
          value={payload.merchant_id}
          placeholder="Enter Merchant ID"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="merchant_ref_no"
          value={payload.merchant_ref_no}
          placeholder="Enter Merchant Ref No"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="virtual_address"
          value={payload.virtual_address}
          placeholder="Enter Virtual Address"
          onChange={handleChange}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
