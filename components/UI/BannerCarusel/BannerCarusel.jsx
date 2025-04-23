import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./BannerCarusel.module.scss";
let cx = classNames.bind(styles);

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Importar estilos
import "swiper/css";
import "swiper/css/effect-fade";

export default function CardsCarusel({ data, translations }) {
	return (
		<section className="pt-4 pt-lg-5 ">
			<div className="container-fluid px-1">
				<div className="row">
					<div className="col-12 col-lg-6">
						{data?.titulo && (
							<h2 className="font-base fs-2 fw-light mb-1">
								{translations.sectionBannerCaruselTitulo || data?.titulo}
							</h2>
						)}
						{data?.descripcion && (
							<p className="text-gray fs-p">
								{translations.sectionBannerCaruselDescripcion || data?.descripcion}
							</p>
						)}
						<div className="row pt-2">
							{data?.items?.map((item, index) => (
								<div className="col-12 col-lg-6 mb-1" key={index}>
									<div className={cx(["item", "shadow"])}>
										<div className={cx(["icon","position-relative"])}>
											<Image
												src={item?.icono?.mediaItemUrl}
												alt={item?.icono?.altText}
												width={item?.icono?.mediaDetails?.width}
												height={item?.icono?.mediaDetails?.height}
											/>
										</div>
										<div className="py-1 pe-1">
											{item?.titulo && (
												<h3 className="font-secondary fs-medium text-gray text-left mb-1">
													{item?.titulo}
												</h3>
											)}
											{item?.detalle && (
												<p className={cx(["text", "text-gray", "text-left"])}>{item?.detalle}</p>
											)}
										</div>
									</div>

								</div>
							))}
						</div>
					</div>
					<div className="col-12 col-lg-6">
						<div className="d-flex justify-content-center align-items-center h-100">
							<Swiper
								modules={[Autoplay, Navigation, Pagination, EffectFade]}
								spaceBetween={10}
								slidesPerView={1.1}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false,
								}}
								speed={2000}
								navigation={false}
								breakpoints={{
									1024: {
										slidesPerView: 1,
									},
								}}
								pagination={true}
								// onSlideChange={() => console.log('slide change')}
								className="mySwiper"
							>
								{data?.slides?.map((slide, index) => (
									<SwiperSlide key={index}>
										<div className={cx(["slide", "d-flex position-relative"])}>
											<Image
												src={slide?.imagen?.mediaItemUrl}
												alt={slide?.imagen?.altText}
												width={slide?.imagen?.mediaDetails?.width}
												height={slide?.imagen?.mediaDetails?.height}
												objectFit="cover"
											/>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
