import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/authService';

const Register = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser(data);
            if (response.status == 201) {
                toast.success("account created successfully");
                navigate('/login')
            } else {
                toast.error("there is error while creating account");
            }
        } catch (error) {
            toast.error("there is error while creating account");
            console.log(error);
        }

    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5 mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            <h4 className="mb-0">Register</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input
                                        onChange={onChangehandler}
                                        value={data.name}
                                        name='name'
                                        required
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        placeholder="Enter your Full Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        onChange={onChangehandler}
                                        value={data.email}
                                        name='email'
                                        type="email"
                                        required
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        onChange={onChangehandler}
                                        value={data.password}
                                        name='password'
                                        type="password"
                                        required
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password" />
                                </div>
                                <div className="mb-3 ">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success w-100">
                                        Register
                                    </button>
                                </div>
                                <div className='mt-3'>
                                    Already have account ? <Link to="/login">login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
