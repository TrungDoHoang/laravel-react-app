import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../constants";

const Login = () => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            <input type="email" name="" placeholder="Email" id="" />
            <input type="password" name="" placeholder="Password" id="" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Register? <Link to={PATH.REGISTER}>Create a account</Link>
            </p>
        </form>
    );
};

export default Login;
