import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./TextGridThreeImages.module.scss";
let cx = classNames.bind(styles);

export default function TextGridThreeImages({ data, translations }) {
	return (
		<section className="section sectionTextGridThreeImages bg-white py-4 py-lg-5">
			<div className="container-fluit px-1">
				<div className="row">
					<div className="col-lg-9 m-auto">
						<div className="text-center">
							{data?.titulo && (
								<h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">
									{translations.sectionTextGridThreeImagesTitulo || data?.titulo}
								</h2>
							)}
							{data?.descripcion && (
								<p className="text-gray mb-3">{translations.sectionTextGridThreeImagesDescripcion || data?.descripcion}</p>
							)}
						</div>
					</div>
				</div>
				<div className="row">
					{data?.imagenes?.map((imagen, index) => (
						<div key={index} className={`col-lg-4 ${index === 1 ? 'mt-lg-5' : ''}`}>
							<div className={cx(["img", "d-flex mb-1 mb-lg-0 position-relative justify-content-center"])}>
								<Image
									src={imagen?.imagen?.mediaItemUrl}
									alt={imagen?.imagen?.altText}
									width={imagen?.imagen?.mediaDetails?.width}
									height={imagen?.imagen?.mediaDetails?.height}
								/>
								<div className="position-absolute bottom-0 w-100 p-1 z-1">
									<h3 className="fs-6 text-white">{imagen.titulo}</h3>
									<p className="fs-p text-white">{imagen.detalle}</p>
								</div>
							</div>
						</div>
					))}
				</div>
				{data?.cta?.url && (
					<div className="col-lg-4 m-auto pt-3">
						<a
							href={data?.cta?.url}
							className="button button-black m-auto"
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
		</section>
	);
}
