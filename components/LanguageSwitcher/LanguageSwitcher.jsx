import { useLanguage } from "../../context/LanguageContext";
import { useState, useEffect } from "react";
import Image from "next/image";

import flagColombia from "/public/icons/flag-colombia.png";
import flagUsa from "/public/icons/flag-estados-unidos.png";

const LanguageSwitcher = () => {
	const languageContext = useLanguage();
	const switchLanguage = languageContext?.switchLanguage;
	const currentLanguage = languageContext?.language || "en";
	const [isSpanish, setIsSpanish] = useState(currentLanguage === "es");
	
	useEffect(() => {
		setIsSpanish(currentLanguage === "es");
	}, [currentLanguage]);

	const handleLanguageSwitch = (lang) => {
		if (switchLanguage) {
			switchLanguage(lang);
		}
	};

	return (
		<div className="LanguageSwitcher px-2">
			{isSpanish ? (
				<button className="d-flex align-items-center bg-transparent border-0 gap-1 p-0" onClick={() => handleLanguageSwitch("en")}>
					EN
					<Image src={flagUsa} alt="Flag of Colombia" width={20} height={20} />
				</button>
			) : (
				<button className="d-flex align-items-center bg-transparent border-0 gap-1 p-0" onClick={() => handleLanguageSwitch("es")}>
					ES
					<Image src={flagColombia} alt="Flag of Colombia" width={20} height={20} />
				</button>
			)}
		</div>
	);
};

export default LanguageSwitcher;