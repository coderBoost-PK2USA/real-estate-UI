
 const Statistics = (props) => {


    return (
        <div className="Stats">
            <h1>{props.name} </h1>
            <h1> Onboard :   </h1>
            <h1>{props.count}</h1>


        </div>
    );

}

export default Statistics;