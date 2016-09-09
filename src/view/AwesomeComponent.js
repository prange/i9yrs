import React, {PropTypes} from 'react';

let AwesomeComponent = ({incrementClick, likes, dislikes}) =>(
    <div>
        Likes : <span>{likes}</span><br/>
        Dislikes: <span>{dislikes}</span>
        <div>
            <button onClick={incrementClick}>Like</button>
        </div>
    </div>);

AwesomeComponent.propTypes =
{
    incrementClick: PropTypes.func.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired
};

export default AwesomeComponent;