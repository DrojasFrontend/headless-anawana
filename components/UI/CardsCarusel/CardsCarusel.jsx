import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./CardsCarusel.module.scss";
let cx = classNames.bind(styles);

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Importar estilos
import "swiper/css";
import "swiper/css/effect-fade";

import slidePrevNext from "/public/icons/icon-next-slide.svg";

export default function CardsCarusel({ data, translations }) {
	return (
		<section className="section sectionCardsCarusel bg-white-100 py-4 py-lg-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-9 m-auto text-center mb-3">
						{data?.titulo && (
							<h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">
							{translations?.sectionCardsCaruselTitulo || data?.titulo}
							</h2>
						)}
						{data?.descripcion && (
							<div className="col-lg-10 m-auto">
								<p className="text-gray fs-p">
								{translations?.sectionCardsCaruselDescripcion || data?.titulo}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="pe-0 px-lg-4 mb-3">
				<div className="container position-relative px-0 p-lg-1">
					<Swiper
						modules={[Autoplay, Navigation, Pagination, EffectFade]}
						spaceBetween={20}
						slidesPerView= {1.3}
						breakpoints={{
							1024: {
								slidesPerView: 2,
							},
						}}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						speed={2000}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						}}
						pagination={false}
						// onSlideChange={() => console.log('slide change')}
						className="mySwiper"
					>
						{data?.slides?.map((slide, index) => (
							<SwiperSlide key={index}>
								<div className={cx("slide", "d-flex")}>
									<Image
										src={slide?.imagen?.mediaItemUrl}
										alt={slide?.imagen?.altText}
										width={slide?.imagen?.mediaDetails?.width}
										height={slide?.imagen?.mediaDetails?.height}
										objectFit="cover"
									/>
									<div className="position-absolute bottom-0 p-1 z-1">
										<h3 className="fs-6 text-white text-start">{slide.titulo}</h3>
										<p className="fs-p text-white">{slide.descripcion}</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>
				</div>
			</div>
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
		</section>
	);
}
