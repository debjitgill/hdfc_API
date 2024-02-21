import React, { useState, useEffect } from "react";

function generateRandom9DigitNumber() {
  // Generate a random number between 100,000,000 and 999,999,999
  const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;

  return randomNumber.toString();
}
const randomNumber = generateRandom9DigitNumber();

const ClientDetails = () => {
  const [msg, setMsg] = useState("");
  const [number, setNumber] = useState([]);
  const [payload, setPayload] = useState({
    pgMerchantId: "",
    orderNo: randomNumber,
    payerVA: "",
    amount: "",
    remarks: "TEST",
    expValue: "10",
    mccCode: "6012",
  });
  useEffect(() => {
    
  }, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/initiateTransaction`,
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
        console.log(
          responseData.encryptdata,
          "================================="
        );
        const encryptdata = responseData.encryptdata;
        if(encryptdata === ""){
            return false
        }else {
            // Construct callback URL
            const callbackUrl = `https://uat.d118gahimc92w7.amplifyapp.com/upi/callBackRes?meRes=${encryptdata}&pgMerchantId=HDFC000000999009`;

            // Redirect to callback URL
            window.location.href = callbackUrl;
        }
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
          name="pgMerchantId"
          value={payload.pgMerchantId}
          placeholder="Enter PGMerchant ID"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="payerVA"
          value={payload.payerVA}
          placeholder="Enter PayerVA"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="amount"
          value={payload.amount}
          placeholder="Enter Value"
          onChange={handleChange}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default ClientDetails;
