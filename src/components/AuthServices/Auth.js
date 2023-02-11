import jwt_decode from "jwt-decode";

// GET CURRENT USER
export const initializeAuthState = (token, setIsLogin, setUser) => {

    if (!token) {
        setIsLogin(false);
        return;
    }
    try {
        const details = jwt_decode(token);
        setUser(details);
        setIsLogin(true);

    } catch (error) {
        console.log("Error: ", error.message);
    }
};

export const logoutAuthState = (setCurrentUser) => {
    setCurrentUser([]);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("ownerId")
    localStorage.removeItem("ownerStatus")
}


export const isUserRole = (user, role) => {
    if (user && typeof user.roles !== 'undefined' && user.roles[0] === role) {
        return true
    }
    return false;
}

export const getAuthHeader = (token) => {
    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };
}

// check token is expired or not before API calls
export const isTokenExpired = (token) => {

    if (!token) {
        return true;
    }
    try {
        const decoded = jwt_decode(token);

        const currentTime = Date.now() / 1000;
        // console.log(decoded.exp);
        // console.log(currentTime);
        if (decoded.exp < currentTime) {
            return true;
        }
    } catch (err) {
        console.error(err);
    }
}
