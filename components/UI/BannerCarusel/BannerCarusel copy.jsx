import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./BannerCarusel.module.scss";
let cx = classNames.bind(styles);

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Importar estilos
import "swiper/css";
import "swiper/css/effect-fade";

import slidePrevNext from "/public/icons/icon-next-slide.svg";
import slideIcon1 from "/public/icons/icon-img-1.png";
import slideIcon2 from "/public/icons/icon-img-2.png";
import slideIcon3 from "/public/icons/icon-img-3.png";
import slideIcon4 from "/public/icons/icon-img-4.png";

export default function CardsCarusel({ data, translations }) {
	return (
		<section className="section sectionBannerCarusel bg-white pt-4 pt-lg-5">
			<div className="container-fluit px-1">
				<div className="row">
					<div className="col-lg-9 m-auto text-center mb-3">
						{data?.titulo && (
							<h2 className="font-base fs-2 fw-light mb-1">
								{translations.sectionBannerCaruselTitulo || data?.titulo}
							</h2>
						)}
						{data?.descripcion && (
							<div className="col-lg-10 m-auto">
								<p className="text-gray fs-p">
									{translations.sectionBannerCaruselDescripcion || data?.descripcion}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="pe-0 px-lg-4 pb-3">
				<div className="container-fluit px-1 position-relative px-0 p-lg-1">
					<Swiper
						modules={[Autoplay, Navigation, Pagination, EffectFade]}
						spaceBetween={10}
						slidesPerView= {1.1}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						speed={2000}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						}}
						breakpoints={{
							1024: {
								slidesPerView: 1,
							},
						}}
						pagination={false}
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
					<div className="swiper-button-prev">
						
					</div>
					<div className="swiper-button-next">
						
					</div>
				</div>
			</div>

			<div className={cx(["bg", "bg-primary py-lg-3 pt-3"])}>
				<div className="container-fluit px-1">
					<div className="row">
						{data?.items?.map((item, index) => (
							<div className="col-sm-6 col-lg-3 mb-3 mb-lg-0" key={index}>
								<div className={cx(["icon", "position-relative"])}>
									<Image
										src={item?.icono?.mediaItemUrl}
										alt={item?.icono?.altText}
										width={item?.icono?.mediaDetails?.width}
										height={item?.icono?.mediaDetails?.height}
									/>
								</div>

								{item?.titulo && (
									<h3 className="font-base text-white text-center my-1">
										{item?.titulo}
									</h3>
								)}
								{item?.detalle && (
									<p className="text-white text-center">{item?.detalle}</p>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
