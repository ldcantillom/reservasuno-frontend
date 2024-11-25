import { useState, useEffect } from "react";
import './../styles/ButtonTheme.scss';

const ButtonTheme = () => {
    const [isLightTheme, setIsLightTheme] = useState(() => {
        return localStorage.getItem("theme") === "light";
    });

    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains("light")) {
            html.classList.remove("light");
            html.classList.add("dark");
            setIsLightTheme(false);
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            setIsLightTheme(true);
            localStorage.setItem("theme", "light");
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const html = document.documentElement;
        if (savedTheme === "dark") {
            html.classList.add("dark");
            setIsLightTheme(false);
        } else {
            html.classList.add("light");
            setIsLightTheme(true);
        }
    }, []);

    return (
        <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
            {isLightTheme ? (
                <i className="fa-solid fa-sun"></i>
            ) : (
                <i className="fa-regular fa-moon"></i>
            )}
        </button>
    );
};

export default ButtonTheme;
