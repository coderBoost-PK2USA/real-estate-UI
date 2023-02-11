import ReactImageAppear from "react-image-appear";
import {initializeAuthState, isUserRole} from "../AuthServices/Auth";
import {useEffect, useState} from "react";

function Property(props) {

    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
    }, [token]);

    const [wishListCount, setWishListCount] = useState(0)
    const [wishList, setWishList] = useState(false)

    const handleWishList = () => {
        setWishList(!wishList)
        setWishListCount(wishListCount + 1)
    }

    return (
        <div className="Content">
            <ReactImageAppear
                src="property_2_190x190.jpg"
                animation="zoomIn"
                animationDuration="1s"
            />
            <h5>{props.name}</h5>
            <h6>Category: {props.category}</h6>
            <h6>Price: {props.price}$</h6>
            <p>Address: {props.address}</p>

            {isUserRole(user, 'OWNER') ? (
                <label>{wishListCount} people liked this property</label>
            ) : (
                <>
                    <button
                        onClick={handleWishList}> {(wishList) ? "Remove From Wishlist" : "Add To Wishlist"} </button>
                </>
            )}

        </div>
    );

}


export default Property