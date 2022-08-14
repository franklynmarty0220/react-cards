import React from 'react';

function Cards({name, image}) {
    const [{angle, x, y}] = useState({
        angle: Math.random() * 90 - 45,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,

    })

    const transform = `translate(${x}px, ${y}px, rotate(${angle}deg))`;

    return (
        <img
            alt={image}
            src={image}
            style={{transform}}
        />
    )
}


export default Cards