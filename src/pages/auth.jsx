import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({route}) => {
    const form = useRef(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
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
                const result = await response.text();
                setMessage(result);
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
            <div className="form-container">
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
                        className="buttonStyles type-1 login-button"
                        onClick={handleSubmit}
                    >
                        {route === "signup" ? "SignUp" : "Login"}
                    </button>
                    {route === "login" && <a href="/">Forgot my password</a>}
                </form>
                
                {message && <p>{message}</p>}

                <button
                    onClick={() => route === "signup" ? navigate("/login") : navigate("/signup")}
                    className={`buttonStyles type-2 ${route}-button`}
                >
                    {route === "signup" ? "Login" : "Signup"}
                </button>
            </div>
        </div>
    );
};

export default Auth;