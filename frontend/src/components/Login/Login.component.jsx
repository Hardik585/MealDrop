import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const { setToken, setUserName, loadCartData } = useContext(StoreContext);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser(data);
            if (response.status === 200) {
                toast.success('login successful');
                setToken(response.data.token);
                setUserName(response.data.email);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                loadCartData(response.data.token);
                navigate('/')
            } else {
                toast.error('login failed. Something is wrong');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Login failed');
            } else {
                toast.error('Server not responding');
            }
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        onChange={onChangeHandler}
                                        name='email'
                                        value={data.email}
                                        required
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        onChange={onChangeHandler}
                                        name='password'
                                        value={data.password}
                                        required
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password" />
                                </div>
                                <div className="mb-3 ">
                                    <button type="submit" className="btn btn-outline-primary w-100">Login</button>
                                </div>
                                <div className='mt-3'>
                                    don't have account? <Link to="/register">Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
