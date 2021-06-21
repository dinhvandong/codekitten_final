import React, { useState } from "react";
import styles from "./button-group.css";
const ButtonGroup = ({ buttons, doSomethingAfterClick }) => {
    const [clickedId, setClickedId] = useState(0);

    const handleClick = (event, id) => {
        event.preventDefault();

        setClickedId(id);
        localStorage.setItem("clicktab", id);
        doSomethingAfterClick(event);
    };

    return (
        <div>
            {buttons.map((buttonLabel, i) => (
                <button
                    key={i}
                    name={buttonLabel}
                    onClick={(event) => handleClick(event, i)}
                    className={
                       (i === clickedId)   ? styles.customButton_active : styles.customButton
                    }
                >
                    {buttonLabel}
                </button>
            ))}
        </div>
    );
};

export default ButtonGroup;

