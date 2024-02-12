import React , {useState} from "react";

const UpiVerification = () => {

    const [formData, setFormData] = useState({
        upiId: '',
        amount: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log(formData); // Log the form data to the console
      };


  return (
    <>
      <div>UpiVerification</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            UpiID:
            <input type="text" name="upiId" value={formData.upiId} onChange={handleChange}  />
          </label>
          Amount:
            <input type="number"  name="amount" value={formData.amount} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default UpiVerification;
