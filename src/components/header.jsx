import './../styles/header.scss';

const Header = () => {
    return (
        <>
            <header>
                <div className="header">
                    <h1>PichiFly</h1>
                    <ul className="navbar">
                        <li><a href="/">Reservar</a></li>
                        <li><a href="/reservations">Ofertas y destinos</a></li>
                        <li><a href="/reserves">Tu reserva</a></li>
                    </ul>
                    <a className="button type-3 login-button" href="/login">Login</a>
                </div>
            </header>
        </>
    );
};

export default Header;