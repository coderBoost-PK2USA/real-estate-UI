import './OwnerProperty.css'
import {useState} from "react";

function OwnerProperty(props) {

    const [showAll, setShowAll] = useState(false);
    const handleShowAllBtn = () => {
        setShowAll(!showAll);
    }

    return (<div className="img-div">
            <img
                src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"/>
            <br/><input type="button" value={showAll ? "Hide" : "Show All"} onClick={handleShowAllBtn}/>
            {showAll ? <div>
                <img
                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"/>
                <img
                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"/>
                <img
                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"/>


            </div> : null}

            <h1>{props.name}</h1>
            <p>{props.detail}</p>
            <h2>Category: {props.cat}</h2>
            <input type="button" value={props.status}/>
            <h3>PRICE: {props.price}</h3>
            <p>Address: {props.address}</p>


        </div>);
}

export default OwnerProperty;