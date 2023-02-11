function PropertyOffer(props) {
    return (
        <div className="Content">
            <h5>Offer For => {props.propertyName} Property</h5>
            <h6>Details: {props.propertyDetails}</h6>
            <h6>Price: {props.offeredPrice}$</h6>
            <h5>{props.offerStatus}</h5>
            <p id={props.customerUserId}>Client: {props.customerName}</p>
        </div>
    );
}

export default PropertyOffer
