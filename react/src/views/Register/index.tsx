import { Link } from "react-router-dom";
import { PATH } from "../../constants";
import { useRef, useState } from "react";
import { registerApi } from "../../api/apis";
import { registerPayload } from "../../type";
import { useStateContext } from "../../contexts/ContextProvider";

const Register = () => {
    const { setToken, setUser } = useStateContext();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(undefined);
        const payload: registerPayload = {
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            password_confirmation: passwordConfirmationRef.current?.value || "", //
        };
        registerApi(payload)
            .then((res) => {
                const data = res.data;
                setToken(data?.token as string);
                setUser(data?.user);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response?.data?.errors);
                }
            });
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Register your account</h1>
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
                type="text"
                name=""
                ref={nameRef}
                placeholder="Full name"
                id=""
            />
            <input
                type="email"
                name=""
                ref={emailRef}
                placeholder="Email"
                id=""
            />
            <input
                type="password"
                name=""
                ref={passwordRef}
                placeholder="Password"
                id=""
            />
            <input
                type="password"
                name=""
                ref={passwordConfirmationRef}
                placeholder="Password Confirmation"
                id=""
            />
            <button className="btn btn-block">Register</button>
            <p className="message">
                Already Registered? <Link to={PATH.LOGIN}>Sign in account</Link>
            </p>
        </form>
    );
};

export default Register;
