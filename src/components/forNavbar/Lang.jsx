import React from "react";
import { useTranslation } from 'react-i18next';

function Lang() {
    const { i18n } = useTranslation();

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <div className="block">
            <button 
                onClick={changeLanguage} 
                value="en"
                className={i18n.language === 'en' ? 
                'text-blue inline-block mt-4 px-3 py-2 lg:mt-0 border border-transparent bg-white' 
                : 
                'text-white inline-block mt-4 px-3 py-2 lg:mt-0'}
            >
                EN
            </button>
            <button 
                onClick={changeLanguage} 
                value="cz"
                className={i18n.language === 'cz' ? 
                'text-blue inline-block mt-4 px-3 py-2 lg:mt-0 border border-transparent bg-white' 
                : 
                'text-white inline-block mt-4 px-3 py-2 lg:mt-0'}
            >
                CZ
            </button>
        </div>
    );
}

export default Lang;
