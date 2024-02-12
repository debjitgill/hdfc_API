import React , {useState} from "react";

const UpiVerification = () => {

    const [formData, setFormData] = useState({
        upiId: '',
        amount: '',
      });
    
      // Handle changes to input fields
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
            UpiID
            <input type="text" value={formData.upiId} onChange={handleChange}  />
          </label>
          Amount
            <input type="number"  value={formData.amount} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default UpiVerification;
