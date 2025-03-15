import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./TextGridImages.module.scss";
let cx = classNames.bind(styles);

export default function TextImageOne({ data, translations }) {
	return (
		<section className="sectionTextGridImages bg-white-100 py-4 py-lg-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-9 m-auto">
						<div className="text-center">
							{data?.titulo && (
								<h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">
									{translations.sectionTextGridImagesTitulo || data?.titulo}
								</h2>
							)}
							{data?.descripcion && (
								<p className="text-gray mb-3">{translations.sectionTextGridImagesDescripcion || data?.descripcion}</p>
							)}
							{data?.cta?.url && (
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
							)}
						</div>
					</div>
				</div>
				<div className="row">
					{data?.imagenes?.map((imagen, index) => (
						<div key={index} className="col-lg-6 d-flex mb-1 mb-lg-0">
							<Image
								src={imagen?.imagen?.mediaItemUrl}
								alt={imagen?.imagen?.altText}
								width={imagen?.imagen?.mediaDetails?.width}
								height={imagen?.imagen?.mediaDetails?.height}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
