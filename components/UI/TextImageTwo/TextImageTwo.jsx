import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./TextImageTwo.module.scss";
let cx = classNames.bind(styles);

import slidePrevNext from "/public/icons/icon-next-slide.svg";

export default function TextImageTwo({ data, translations }) {
	return (
		<section className="section sectionTextImageTwo bg-white-100 py-4 py-lg-5">
			<div className="container-fluit px-1">
				<div className="row">
					<div className="col-lg-6 mb-3 mb-lg-0">
						<div className="col-lg-7">
							{data?.titulo && (
								<h2 className="font-base fs-2 fw-light mb-1">
									{translations.sectionTextImageTwoTitulo || data?.titulo}
								</h2>
							)}
							{data?.descripcion && (
								<p className="text-gray mb-3">{translations.sectionTextImageTwoDescripcion || data?.descripcion}</p>
							)}

							{data?.cta?.url && (
								<div className="d-flex justify-content-center">
									<a
										href={data?.cta?.url}
										className="button button-black"
										target={data?.cta?.target}
									>
										<span className="line line-black">
											{data?.cta?.title}
											<span className="line-black-top"></span>
											<span className="line-black-right"></span>
											<span className="line-black-bottom"></span>
											<span className="line-black-left"></span>
										</span>
									</a>
								</div>
							)}
						</div>
					</div>
					{data?.imagenes?.slice(0, 1).map((imagen, index) => (
						<div key={index} className="col-lg-6 d-flex position-relative">
							<Image
								src={imagen?.imagen?.mediaItemUrl}
								alt={imagen?.imagen?.altText}
								width={imagen?.imagen?.mediaDetails?.width}
								height={imagen?.imagen?.mediaDetails?.height}
							/>
							<div className="d-none d-lg-flex position-absolute bottom-0 end-0 mb-n5">
								<Image
									src={data?.imagenes[1]?.imagen?.mediaItemUrl}
									alt={data?.imagenes[1]?.imagen?.altText}
									width={data?.imagenes[1]?.imagen?.mediaDetails?.width}
									height={data?.imagenes[1]?.imagen?.mediaDetails?.height}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
