import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch("https://login-registration-2.onrender.com/api/login", {
            method: "POST",
            headers: {  // ✅ FIXED HERE
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.message || "Login failed");
                    });
                }
                return res.json();
            })
            .then(data => {
                
                toast.success("Successfully logged in", { position: 'top-right' });
                setTimeout(()=>{navigate('/dashboard')},2000)
                // ✅ FIXED typo: dashborad ➜ dashboard
            })
            .catch(err => {
                toast.error(err.message || "Login failed", { position: "top-right" }); // ✅ FIXED err.meassage ➜ err.message
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="rounded-2xl w-1/4 h-100 bg-black">
                <h1 className="mt-2 text-4xl text-center text-blue-700">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="pt-5 m-5">
                        <label className="text-2xl text-blue-700"><strong>name</strong></label>
                        <br />
                        <input
                            type="text"
                            value={values.name}
                            name="name"
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="p-2 mt-2 w-full text-blue-600 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="m-5">
                        <label className="text-2xl text-blue-700"><strong>Password</strong></label>
                        <br />
                        <input
                            type="password"
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="p-2 mt-2 w-full text-blue-600 border border-gray-300 rounded"
                        />
                    </div>
                    <center>
                        <button type="submit" className="bg-blue-500 py-2 px-6 rounded-2xl text-white hover:bg-amber-50 hover:text-blue-600">
                            Login
                        </button>
                        <br />
                        <button
                            className="mt-4 py-2 px-6 bg-fuchsia-600 rounded-2xl text-white hover:bg-amber-50 hover:text-fuchsia-800"
                            onClick={() => navigate('/')}
                        >
                            Signup
                        </button>
                    </center>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
