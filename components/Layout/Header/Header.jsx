import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import IconMenu from "../../SVG/IconMenu";
import MenuMobile from "../MenuMobile/MenuMobile";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
let cx = classNames.bind(styles);

import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../public/translations.json";

export default function Header({ data, logo }) {
	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 0;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const languageContext = useLanguage();
	const language = languageContext?.language || "en";
	const menuTranslations = translations?.[language]?.menu || {};

	const getTranslatedMenuLabel = (menuItem) => {
    let path = menuItem.path.replace(/^\/|\/$/g, "");
    
    if (path === "") path = "inicio";
    else if (path === "#") path = "reservar";
    
    const translation = menuTranslations[path];
    if (translation) return translation;
    
    return menuItem.label;
  };

	return (
		<>
			<header
				className={`header position-fixed w-100 z-2 py-lg-1 ${
					scrolled ? "header-scrolled" : ""
				}`}
			>
				<div className="container">
					<nav className="row">
						<div className="col-6 col-lg-2">
							<Link href="/">
								<a className="d-flex justify-content-center align-items-center h-100 position-relative">
									<div className="logo">
										<Image
											src={logo?.logo?.mediaItemUrl}
											alt={logo?.logo?.mediaItemUrl?.altText}
											width={250}
											height={100}
											objectFit="contain"
										/>
									</div>
									<div className="logoSecundario">
										<Image
											src={logo?.logoHover?.mediaItemUrl}
											alt={logo?.logoHover?.mediaItemUrl?.altText}
											width={250}
											height={100}
											objectFit="contain"
										/>
									</div>
								</a>
							</Link>
						</div>
						<div className="d-none d-lg-block col-lg-8">
							<ul className="d-flex justify-content-lg-around align-middle w-100 h-100">
								{data?.headerMenuItems.nodes?.map((menuItem, index) => (
									<li
										key={index}
										className={`d-flex justify-content-lg-center align-content-center ${menuItem.cssClasses?.join(
											" "
										)}`}
									>
										{(menuItem.cssClasses || []).includes("reservar") ? (
											<a
												href={menuItem?.path}
												className="button button-white"
												target={menuItem?.target}
											>
												<span className="line line-white d-flex justify-content-center align-items-center">
                          {getTranslatedMenuLabel(menuItem)}
													<span className="line-white-top"></span>
													<span className="line-white-right"></span>
													<span className="line-white-bottom"></span>
													<span className="line-white-left"></span>
												</span>
											</a>
										) : (
											<Link href={menuItem?.path}>
                      <a className="d-flex align-items-center text-white text-uppercase">
                        {getTranslatedMenuLabel(menuItem)}
                      </a>
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>
						<div className="col-6 col-lg-2">
							<div className="d-none d-xl-flex justify-content-end align-items-center h-100">
								<LanguageSwitcher />
							</div>
							<button
								className="d-xl-none m-auto me-0 d-flex justify-content-end align-items-center h-100 border-0 bg-transparent"
								onClick={() => setIsOpen(!isOpen)}
							>
								<IconMenu />
							</button>
						</div>
					</nav>
				</div>
			</header>

			<MenuMobile
				data={data}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				logo={logo}
			/>
		</>
	);
}
