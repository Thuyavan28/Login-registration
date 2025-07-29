// signup.jsx
import { useState } from 'react';
import './index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // ← missing before

function Signup() {  // ← rename this from App to Signup
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.message || "signup failed");
          });
        }
        return res.json();
      })
      .then(data => {
        toast.success("Successfully registered!", { position: 'top-right' });

        setValues({ name: '', email: '', password: '' });
        setTimeout(()=>{
            navigate('/login')
        },3000)
      })
      .catch(e => {
        toast.error(e.message, { position: "top-right" });
        setValues({ name: '', email: '', password: '' });
      });
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-black p-8 rounded-lg w-[400px]'>
        <h1 className='text-center text-blue-600 text-4xl'>Signup</h1>
        <form onSubmit={handleSubmit} className='pt-8'>
          <div className='mb-5'>
            <label className='text-blue-600'><strong>Name</strong></label>
            <input
              type='text'
              placeholder='Enter Name'
              name='name'
              className='w-full mt-2 p-2 text-blue-500 border border-gray-300 rounded'
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className='mb-5'>
            <label className='text-blue-600'><strong>Email</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              className='w-full mt-2 p-2 text-blue-500 border border-gray-300 rounded'
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className='mb-5'>
            <label className='text-blue-600'><strong>Password</strong></label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              className='w-full mt-2 p-2 text-blue-500 border border-gray-300 rounded'
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='w-full bg-green-500 text-white py-2 rounded-3xl hover:bg-white hover:text-green-600 border border-green-500 transition duration-300'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='mt-4 w-full bg-green-500 text-white py-2 rounded-3xl hover:bg-white hover:text-green-600 border border-green-500 transition duration-300'
            >
              Login
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup; // ← must match import in App.jsx
