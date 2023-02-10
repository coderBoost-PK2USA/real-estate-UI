import * as React from 'react';


import './OwnerReview.css'
import {Link} from "react-router-dom";

export default function Owner(props) {

    const handleClick = () => {
        window.location.href = 'mailto:poojakumari11228@gmail.com';
    };

    return (<>
            <div className='table_row' key={props.id}>
                <div className='table_small'>
                    <div className='table_cell'>Header One</div>
                    <div className='table_cell'>{props.sr}</div>
                </div>
                <div className='table_small'>
                    <div className='table_cell'>Header Two</div>
                    <div className='table_cell'>{props.name}</div>
                </div>
                <div className='table_small'>
                    <div className='table_cell'>Header Three</div>
                    <div className='table_cell'>{props.st} , {props.statee} - {props.zipcode}</div>
                </div>
                <div className='table_small'>
                    <div className='table_cell'>Header Four</div>
                    <div className='table_cell'>{props.status}</div>
                </div>

                <div className='table_small'>
                    <div className='table_cell' style={{"background-color": "white"}}>Header Four</div>
                    <Link
                        to={{
                            pathname: '/review-detail/' + props.sr, state: JSON.stringify({id: props.id})
                        }}
                    >
                        <div className='table_cell' style={{"color": "lightcoral"}}>View / Change Status</div>
                    </Link>
                </div>
                <Link to="#">
                    <div className='table_small' onClick={handleClick}>
                        <div className='table_cell' style={{"color": "lightcoral"}}>Contact</div>
                    </div>
                </Link>
            </div>
        </>

    );
}