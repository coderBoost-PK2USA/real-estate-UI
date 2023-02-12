import './Header.css'
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {initializeAuthState, isUserRole, logoutAuthState} from "../AuthServices/Auth";
import {useNavigate} from "react-router";

const Header = () => {

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [isLogin, setIsLogin] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    useEffect(() => {
        initializeAuthState(token, setIsLogin, setCurrentUser);
    }, [token]);

    const handleLogout = () => {
        logoutAuthState(setCurrentUser);
        navigate("/");
    }

    return (<header className="Header">
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                {isLogin ? (<>

                    {/*  TABS BASED ON ROLES */}
                    {isUserRole(currentUser, "ADMIN") && (
                        <li><Link to="/review-owners">Review Owners</Link></li>
                    )}

                    {isUserRole(currentUser, "OWNER") &&
                        (
                            <li><Link to="/add-property">Add New Property</Link></li>
                        )
                    }
                    {isUserRole(currentUser, "CUSTOMER") &&
                        (
                            <>
                                <li><Link to="/my-offers">My Offers</Link></li>
                                <li><Link to="/wishlist">Wishlist</Link></li>
                            </>

                        )
                    }


                    <li onClick={handleLogout}><Link to="#">Logout</Link></li>

                </>) : (<>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/new-account">Signup</Link></li>
                </>)}

            </ul>
        </nav>
    </header>);

}

export default Header