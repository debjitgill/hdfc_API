import React, { useState } from 'react';
import Login from '../login';

const Admin = () => {
    const [userId, setUserId] = useState("");
    const [userPass, setUserPass] = useState("");
    const [valid, setValid] = useState(false);
    const [msg,setMsg] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello");
        if (userId === "AUDIT" && userPass === "Finovo.tech") {
            setValid(true);
        }else{
            setMsg("Login Failed")
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-center vh-100'>
            {!valid && (
                <form onSubmit={handleSubmit} className='w-25'>
                    <input type='text' className='form-control mb-3' placeholder='Enter Your ID' value={userId} onChange={(e) => setUserId(e.target.value)} />
                    <input type='text' className='form-control mb-3' placeholder='Enter Your Password' value={userPass} onChange={(e) => setUserPass(e.target.value)} />
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    {<p className='text-center'>{msg}</p>}
                </form>
            )}
            {valid && <Login />}
        </div>
    );
};

export default Admin;
