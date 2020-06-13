import React from 'react';

function Menu({index, currentButton, selectedButton, UpdateSelectedButton}) {
    const isActive = () => {
        return `btn ${currentButton==selectedButton ? 'btn-primary' : 'btn-default'}`;
    }
    return (
        <button className={`${isActive()} mx-1`}
            onClick={() => UpdateSelectedButton(currentButton)}
        >
            {currentButton}
        </button>
    )
}

export default Menu;