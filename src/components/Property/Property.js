import ReactImageAppear from "react-image-appear";

function Property(props) {
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
        </div>
    );

}


export default Property
