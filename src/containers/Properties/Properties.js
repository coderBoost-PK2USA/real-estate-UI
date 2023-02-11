import {useEffect, useState} from "react";
import {initializeAuthState, isUserRole} from "../../components/AuthServices/Auth";
import AdminDashboard from "../../components/Admin/AdminDashboard";
import OwnerProperties from "./OwnerProperties";
import CustomerProperties from "./CustomerProperties";

function Properties() {

    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
    }, [token]);

    let component;

    if (isUserRole(user, "ADMIN")) {
        component = <AdminDashboard/>
    } else if (isUserRole(user, "OWNER")) {
        component = <OwnerProperties/>
    } else {
        component = <CustomerProperties/>
    }

    return (
        <>
            <h5>Logged in as {(user.roles) ? user.roles : "VIEWER"}</h5>
            {component}
        </>
    )
}

export default Properties