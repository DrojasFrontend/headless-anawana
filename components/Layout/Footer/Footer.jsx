import Link from "next/link";
import Image from "next/image";
import IconMenu from "../../SVG/IconMenu";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

let cx = classNames.bind(styles);

export default function Footer({ data, logo, redes }) {
	if (!data?.menus && !logo && !redes) {
		return null;
	}

	return (
		<footer className="bg-primary py-4 py-lg-6">
			<div className="container-fluit px-1">
				<div className="row">
					{/* Logo Section */}
					<div className="col-xl-5 mb-3 mb-xl-0">
						{logo?.logo?.mediaItemUrl && (
							<Link href="/">
								<a className="d-flex align-items-center justify-content-xl-start justify-content-center jus h-100 position-relative">
									<Image
										src={logo?.logo?.mediaItemUrl}
										alt={logo?.logo?.mediaItemUrl?.altText || "Logo"}
										width={250}
										height={100}
										objectFit="contain"
									/>
								</a>
							</Link>
						)}
					</div>

					{data?.menus?.map(
						(menu, index) =>
							menu?.tituloMenu && (
								<div
									key={index}
									className={`${
										index === 1
											? "col-xl-2 mb-3 mb-xl-0"
											: "col-xl-4 mb-3 mb-xl-0"
									}`}
								>
									<h3 className="fs-6 text-white mb-1">{menu.tituloMenu}</h3>
									{Array.isArray(menu?.items) &&
										menu.items.map(
											(item, index) =>
												item?.cta?.url && (
													<Link href={item.cta.url} key={index}>
														<a
															className="d-block text-white"
															target={item.cta.target || "_self"}
														>
															{item.cta.title || "Enlace"}
														</a>
													</Link>
												)
										)}
								</div>
							)
					)}

					{Array.isArray(redes) && redes.length > 0 && (
						<div className="col-xl-1">
							<div className="d-flex flex-row flex-xl-column justify-content-center gap-1">
								{redes.map(
									(red, index) =>
										red?.cta?.url &&
										red?.icono?.mediaItemUrl && (
											<Link href={red.cta.url} key={index}>
												<a className="">
													<Image
														src={red.icono.mediaItemUrl}
														alt={red?.cta?.title || "Red social"}
														width={24}
														height={24}
													/>
													{red?.cta?.title && (
														<p className="sr-only">{red.cta.title}</p>
													)}
												</a>
											</Link>
										)
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</footer>
	);
}
