import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";

const LanguageSwitcher = () => {
	const { switchLanguage } = useLanguage();
	const [isSpanish, setIsSpanish] = useState(true);

	const handleLanguageSwitch = (lang) => {
		switchLanguage(lang);
		setIsSpanish(!isSpanish);
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
