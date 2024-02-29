import React,{ useState,useEffect } from "react";

const TransactionStatus = () => {
  const [payload, setPayload] = useState({
    payerVA: "",
    amount: "",
  });
  const [msg, setMsg] = useState("");
  const [valid,setValid] = useState(false)
  useEffect(() => {
    
  }, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://om2ezknjd3myfdzj4jsxvs3zly0begyq.lambda-url.ap-south-1.on.aws/initiateTransaction`,
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
        setMsg(responseData.msg);
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
        <button type="submit" className="btn btn-primary">submit</button>
        {<p className='text-center'>{msg}</p>}
      </form>
      )}
      {/* {valid && <Transaction/>} */}
    </div>
  )
};

export default TransactionStatus;
