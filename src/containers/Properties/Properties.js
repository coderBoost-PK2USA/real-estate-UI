import {useEffect, useState} from "react";
import {initializeAuthState, isUserRole} from "../../components/AuthServices/Auth";

function Properties() {

    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
    }, [token]);

    let component;

    if (isUserRole(user, "ADMIN")) {
        component = <h1>ADMIN_COMPONENT</h1>
    } else if (isUserRole(user, "OWNER")) {
        component = <h1>OWNER_COMPONENT</h1>
    } else {
        component = <h1>DEFAULT</h1>
    }

    return (
        <>
            <h2>Properties Page , Uer {(user.roles) ? user.roles : "viewer"} Role</h2>
            {component}
        </>
    )
}

export default Properties