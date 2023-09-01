import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { loginApi } from "../../api/apis";
import { PATH } from "../../constants";
import { useStateContext } from "../../contexts/ContextProvider";
import { loginPayload } from "../../type";

const Login = () => {
    const { setToken, setUser } = useStateContext();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState<any>();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(undefined);
        const payload: loginPayload = {
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
        };
        loginApi(payload)
            .then((res) => {
                const data = res.data;
                setToken(data?.token as string);
                setUser(data?.user);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response?.data?.errors) {
                        setErrors(response?.data?.errors);
                    } else {
                        setErrors({
                            email: [response.data?.message],
                        });
                    }
                }
            });
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p className="" key={key}>
                            {errors?.[key]?.[0]}
                        </p>
                    ))}
                </div>
            )}
            <input
                ref={emailRef}
                type="email"
                name=""
                placeholder="Email"
                id=""
            />
            <input
                ref={passwordRef}
                type="password"
                name=""
                placeholder="Password"
                id=""
            />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Register? <Link to={PATH.REGISTER}>Create a account</Link>
            </p>
        </form>
    );
};

export default Login;
