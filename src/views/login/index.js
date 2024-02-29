import React, { useState,useEffect } from "react";
import Transaction from "../../transactionStatus"
const Login = () => {
  const [payload, setPayload] = useState({
    virtual_address: "",
  });
  const [msg, setMsg] = useState("");
  const [valid,setValid] = useState(false)
  useEffect(() => {
    
  }, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://om2ezknjd3myfdzj4jsxvs3zly0begyq.lambda-url.ap-south-1.on.aws/vpacheck`,
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
        const token = responseData.token;
        sessionStorage.setItem("token", token);
        setMsg("");
        setValid(true)
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
    <div className='d-flex align-items-center justify-content-center vh-100'>
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
        <button type="submit" className="btn btn-primary">submit</button>
        {<p className='text-center'>{msg}</p>}
      </form>
      )}
      {valid && <Transaction/>}
    </div>
  );
};

export default Login;
