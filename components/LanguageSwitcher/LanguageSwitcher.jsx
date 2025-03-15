import { useLanguage } from "../../context/LanguageContext";
import { useState, useEffect } from "react";

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
		<div>
			{isSpanish ? (
				<button className="bg-transparent border-0 text-white" onClick={() => handleLanguageSwitch("en")}>EN 🇺🇸</button>
			) : (
				<button className="bg-transparent border-0 text-white" onClick={() => handleLanguageSwitch("es")}>ES 🇨🇴</button>
			)}
		</div>
	);
};

export default LanguageSwitcher;