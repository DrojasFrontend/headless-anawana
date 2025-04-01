import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./TextImage.module.scss";
let cx = classNames.bind(styles);

import slidePrevNext from "/public/icons/icon-next-slide.svg";

export default function TextImageTwo({ data, translations }) {
	return (
		<section className="sectionTextImage bg-white-100 pt-4 pt-lg-5">
			<div className="container-fluit px-1">
				<div className="row">
					<div className="col-lg-6 mb-3 mb-lg-0">
						<div className="d-flex flex-column justify-content-center h-100 pe-lg-5">
							{data?.titulo && (
								<h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">
									{translations.sectionTextImageTitulo || data?.titulo}
								</h2>
							)}
							{data?.descripcion && (
								<p className="text-gray">{translations.sectionTextImageDescripcion || data?.descripcion}</p>
							)}

							{data?.cta?.url && (
								<a
									href={data?.cta?.url}
									target={data?.cta?.target}
									className="button-icon"
								>
									<Image
										src={slidePrevNext}
										alt="ver mas"
										width={18}
										height={18}
									/>
								</a>
							)}
						</div>
					</div>
						<div className="col-lg-6 d-flex position-relative justify-content-center">
							<Image
								src={data?.imagen?.mediaItemUrl}
								alt={data?.imagen?.altText}
								width={data?.imagen?.mediaDetails?.width}
								height={data?.imagen?.mediaDetails?.height}
							/>
						</div>
				</div>
			</div>
		</section>
	);
}
