import {useContext} from "react";
import {WishlistContext} from "../../Context/WishlistContext";
import Property from "../../components/Property/Property";

function CustomerWishlistProperties() {

    const {customerWishlist} = useContext(WishlistContext);

    const wishlistPropertiesComponents = customerWishlist.map(p => (
        <Property id={p.id} key={p.id} name={p.name} category={p.category} price={p.price} address={p.address}/>
    ))

    return (
        <>
            <h1>Your Wish our Priority</h1>
            <div className="Property">
                {wishlistPropertiesComponents}
            </div>
        </>
    )

}

export default CustomerWishlistProperties