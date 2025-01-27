import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
let cx = classNames.bind(styles);

export default function Header({ data, logo }) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 0;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`header position-fixed w-100 z-2 py-lg-1 ${
				scrolled ? "header-scrolled" : ""
			}`}
		>
			<div className="container">
				<nav className="row">
					<div className="col-lg-2">
						<Link href="/">
							<a className="d-flex justify-content-center align-items-center h-100">
								<Image
									src={logo?.mediaItemUrl}
									alt={logo?.mediaItemUrl?.altText}
									width={logo?.mediaDetails?.width}
									height={logo?.mediaDetails?.height}
								/>
							</a>
						</Link>
					</div>
					<div className="col-lg-8">
						<ul className="d-flex justify-content-lg-around align-middle w-100 h-100">
							{data?.headerMenuItems.nodes?.map((menuItem, index) => {
								console.log("Classes:", menuItem.cssClasses); // Debug
								return (
									<li
										key={index}
										className={`d-flex justify-content-lg-around align-middle ${menuItem.cssClasses?.join(
											" "
										)}`}
									>
										{(menuItem.cssClasses || []).includes("reservar") ? ( // Asegura array
											<a
												href={menuItem?.path}
												className="button button-white"
												target={menuItem?.target}
											>
												<span className="line line-white d-flex justify-content-center align-items-center">
													{menuItem?.label}
													<span className="line-white-top"></span>
													<span className="line-white-right"></span>
													<span className="line-white-bottom"></span>
													<span className="line-white-left"></span>
												</span>
											</a>
										) : (
											<Link href={menuItem?.path}>
												<a className="d-flex align-items-center text-white text-uppercase">
													{menuItem?.label}
												</a>
											</Link>
										)}
									</li>
								);
							})}
						</ul>
					</div>

					<div className="col-lg-2">
						<Link href="#">
							<a className="d-flex justify-content-end align-items-center h-100 text-white">
								En
							</a>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
