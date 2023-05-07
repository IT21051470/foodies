import React, {useEffect, useReducer} from "react";
import "./Login.css";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../../../constants";
import {login} from "../../../util/APIUtils";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import googleLogo from "../../../img/google-logo.png";
import {toast} from "react-toastify";

const Login = ({authenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (location.state?.error) {
                toast(location.state.error, {type: "error"});
            }

            navigate(location.pathname, {replace: true, state: {}});
        }, 100);
    }, [location.pathname, location.state?.error, navigate]);

    if (authenticated) {
        return (
            <Navigate
                to={{
                    pathname: "/",
                    state: {from: location}
                }}
            />
        );
    }

    return (
        <div className="login-container h-screen" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/beverage-fast-food-with-copy-space_23-2148242507.jpg?w=1380&t=st=1683648488~exp=1683649088~hmac=42a40ebe55db1d71bfb624210d980ae95d45418331c3bd4271b446da0d47a2cb')" }}>
            <div className="login-content bg-gray-700">
                <h1 className="login-title">Foodies Login</h1>
                <SocialLogin />
                <div className="or-separator">
                    <span className="or-text bg-gray-600">OR</span>
                </div>
                <LoginForm />
                <span className="signup-link">
        New user? <Link to="/signup">Sign up!</Link>
      </span>
            </div>
        </div>
    );
};

const SocialLogin = () => {
    return (
        <div className="social-login">
            <a className="btn btn-block social-btn google bg-gray-200" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google"/> Log in with Google
            </a>
        </div>
    );
};

const LoginForm = () => {
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState};
        },
        {
            email: "",
            password: ""
        }
    );
    const navigate = useNavigate();

    const handleInputChange = event => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        setState({
            [inputName]: inputValue
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const loginRequest = Object.assign({}, state);

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                toast("You're successfully logged in!", {type: "success"});

                navigate("/");
            })
            .catch(error => {
                toast(
                    (error && error.message) ||
                    "Oops! Something went wrong. Please try again!",
                    {type: "error"}
                );
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
