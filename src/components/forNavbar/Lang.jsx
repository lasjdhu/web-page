import React from "react";
import { useTranslation } from 'react-i18next';

function Lang() {
    const { i18n } = useTranslation();

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <ul className="block">
            <li className="inline-block mt-4 px-3 py-2 lg:mt-0">
                <button onClick={changeLanguage} value="en">EN</button>
            </li> 
            <span>/</span>
            <li className="inline-block mt-4 px-3 py-2 lg:mt-0">
                <button onClick={changeLanguage} value="cz">CZ</button>
            </li> 
        </ul>
    );
}

export default Lang;
