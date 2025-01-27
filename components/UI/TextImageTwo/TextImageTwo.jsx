import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./TextImageTwo.module.scss";
let cx = classNames.bind(styles);

import slidePrevNext from "/public/icons/icon-next-slide.svg";

export default function TextImageTwo({ data }) {
	return (
		<section className="section sectionTextImageTwo bg-white-100 py-4 py-lg-10">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 mb-3 mb-lg-0">
						<div className="col-lg-7">
							{data?.titulo && (
								<h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">
									{data?.titulo}
								</h2>
							)}
							{data?.descripcion && (
								<p className="text-gray mb-3">{data?.descripcion}</p>
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
										width={53}
										height={14}
									/>
								</a>
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