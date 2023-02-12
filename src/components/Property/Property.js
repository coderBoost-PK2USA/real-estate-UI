import ReactImageAppear from "react-image-appear";
import {initializeAuthState, isUserRole} from "../AuthServices/Auth";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {WishlistContext} from "../../Context/WishlistContext";

function Property(props) {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const token = localStorage.getItem("token");
    const {customerWishlist, setCustomerWishlist} = useContext(WishlistContext);

    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
    }, [token]);

    const isAlreadyInWishList = () => {
        if (customerWishlist.length === 0) return false
        return customerWishlist.some(p => p.id == props.id)
    }

    const handleWishListOnCLick = () => {

        if (!isLogin) {
            alert('Login to add properties in your wishlist');
            navigate('/login')
        }

        if (isAlreadyInWishList()) {
            setCustomerWishlist(
                customerWishlist.filter(p => p.id !== props.id)
            )
        } else {
            setCustomerWishlist(
                [...customerWishlist,
                    {
                        id: props.id,
                        name: props.name,
                        category: props.category,
                        price: props.price,
                        address: props.address
                    }
                ]
            )
        }
    }

    const propertyCountInWishList = () => {
        return customerWishlist.filter(p => p.id == props.id).length
    }

    const showPropertyDetails = () => {
        if (isLogin) {
            navigate(`/property-detail/${props.id}`)
        }else {
            alert('Login or Create your Account for property and owner details');
            navigate('/login')
        }
    }

    return (
        <div className="Content">
            <div onClick={showPropertyDetails}>
                <ReactImageAppear
                    src="property_2_190x190.jpg"
                    animation="zoomIn"
                    animationDuration="1s"
                />
                <h5>{props.name}</h5>
                <h6>Category: {props.category}</h6>
                <h6>Price: {props.price}$</h6>
                <p>Address: {props.address}</p>
            </div>
            {isUserRole(user, 'OWNER') ? (
                <label>{propertyCountInWishList()} people added this property in their wishlist</label>
            ) : (
                <>
                    <button
                        onClick={handleWishListOnCLick}> {(isAlreadyInWishList() && isLogin) ? "Remove From Wishlist" : "Add To Wishlist"} </button>
                </>
            )}
        </div>
    );

}


export default Property