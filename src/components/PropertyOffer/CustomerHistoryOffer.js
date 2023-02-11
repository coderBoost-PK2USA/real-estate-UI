
const HistoryOffers =(props)=> {

    return (
        <div className="Content" style={{"width":"auto"}}>
            <img style={{"width":"30%"}} src="https://yardzen.com/wp-content/uploads/2022/07/Modern-Farmhouse_Kate-Derby.jpg"/>
            <h2>PROPERTY : {props.propertyName} Property</h2>
            <h6>Details : {props.propertyDetails}</h6>
            <h6>Price : {props.offeredPrice}$</h6>
            <h5>STATUS : {props.offerStatus}</h5>
            <p id={props.ownerId}>OWNER : {props.ownerName}</p>
        </div>
    );
}


export default HistoryOffers