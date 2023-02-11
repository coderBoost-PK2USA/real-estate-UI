import "./ReviewOwner/OwnerReview.css"

function Owner(props) {



    return (<div className="img-div">
        <img src="https://miro.medium.com/proxy/0*pAdZLfSqNrMZAAPA.jpg"/>
        <h1>{props.name}</h1>
    </div>);
}

export default Owner;