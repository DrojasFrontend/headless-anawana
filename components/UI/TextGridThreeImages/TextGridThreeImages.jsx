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
								<h2 className="font-base fs-2 fw-light mb-1">
									{translations.sectionTextGridThreeImagesTitulo || data?.titulo}
								</h2>
							)}
							{data?.descripcion && (
								<p className="col-12 col-lg-7 m-auto text-gray mb-3">{translations.sectionTextGridThreeImagesDescripcion || data?.descripcion}</p>
							)}
						</div>
					</div>
				</div>
				<div className="row">
					{data?.imagenes?.map((imagen, index) => (
						<div key={index} className="col-lg-4 mb-1">
							<div className={cx(["mb-1 mb-lg-0 position-relative justify-content-center"])}>
								<div className={cx(["img", "d-flex"])}>
									<Image
										src={imagen?.imagen?.mediaItemUrl}
										alt={imagen?.imagen?.altText}
										width={1000}
										height={1200}
										className="object-fit-cover"
									/>
								</div>
								<div className="position-relative text-center pt-1 mb-2">
									<h3 className="fs-4 text-gray mb-1">{imagen.titulo}</h3>
									<p className="fs-p text-gray mb-1">{imagen.detalle}</p>
									<a href={imagen.cta.url} className="font-secondary fs-small text-gray">VIEW MORE</a>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="row">
					{data?.cta?.url && (
						<div className="col-12 col-lg-4 m-auto">
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
			</div>
		</section>
	);
}
