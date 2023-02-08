import './Header.css'
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header className={"Header"}>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/new-account">Create New Account</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header