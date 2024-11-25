import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import './../styles/auth.scss';

const Auth = ({route}) => {
    Auth.propTypes = {route: PropTypes.string.isRequired};
    const form = useRef(null);
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            ...(route === "signup" && {email: formData.get("email")}),
        };
        console.log(data);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/auth/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(response.ok) {
                const responseData = await response.json();
                const token = responseData.token;
                localStorage.setItem('token', token);
                setMessage('Login successful!');
                console.log('Token saved:', token);
            } else {
                const errorMessage = await response.text();
                setMessage(errorMessage || 'Invalid credentials');
            }
        } catch {
            setMessage('An error ocurred. Please try again.');
        }
    };
    return (
        <div className="auth">
            <div className={`${route} form-container`}>
                {/* <img src="./logos/logo_form.svg" alt="logo" className="logo" /> */}

                <form action="/" className="form" ref={form}>
                    <div>
                        <label htmlFor="username" className="label">Username</label>
                        <input type="text" name="username" placeholder="username" className="input input-username"/>
                    </div>

                    {route === "signup" && (
                        <div>
                        <label htmlFor="email" className="label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-email"
                            required
                        />
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="label">Password</label>
                        <input type="password" name="password" placeholder="******" className="input input-password"/>
                    </div>

                    <button
                        className="button type-1"
                        onClick={handleSubmit}
                    >
                        {route === "signup" ? "SignUp" : "Login"}
                    </button>
                    {route === "login" && <a href="/">Forgot my password</a>}
                </form>
                
                {message && <p>{message}</p>}

                <a
                    href={route === "signup" ? "Login" : "Signup"}
                    className={'button type-2'}
                >
                    {route === "signup" ? "Login" : "Signup"}
                </a>
            </div>
        </div>
    );
};

export default Auth;