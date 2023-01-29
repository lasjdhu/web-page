import React from "react";
import { FaHammer } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

function Badge() {
    const { t } = useTranslation();
    
	return (
		<div className="flex p-3 animate-pulse justify-center">
			<FaHammer size="1.5em"/>
			<p className="text-xl pl-5">{t('Building')} . . .</p>
		</div>
	);
}

export default Badge;