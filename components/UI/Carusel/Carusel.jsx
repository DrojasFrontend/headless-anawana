import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./Carusel.module.scss";
let cx = classNames.bind(styles);

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Importar estilos
import "swiper/css";
import "swiper/css/effect-fade";

export default function Carusel({ data }) {
	return (
		<section className="section">
			<Swiper
				modules={[Autoplay, Navigation, Pagination, EffectFade]}
				spaceBetween={30}
				slidesPerView={1}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				effect="fade"
				speed={2000}
				fadeEffect={{
					crossFade: true,
				}}
				navigation
				pagination={{ clickable: true }}
				// onSlideChange={() => console.log('slide change')}
				className="mySwiper"
			>
				{data?.slides?.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className={cx(["slide", "position-relative"])}>
							<Image
								src={slide?.imagen?.mediaItemUrl}
								alt={slide?.imagen?.altText}
								layout="fill"
								objectFit="cover"
							/>
						</div>
					</SwiperSlide>
				))}

				<div
					className={cx([
						"content",
						"position-absolute top-0 left-0 w-100 h-100 z-1 d-flex align-items-end pb-5 pb-lg-10",
					])}
				>
					<div className="container">
						{data?.titulo && (
							<h1 className="fs-1 text-white text-uppercase fw-light">
								{data?.titulo}
							</h1>
						)}

						{data?.descripcion && (
							<p className={cx(["text", "text-white fs-medium fw-light mb-2"])}>
								{data?.descripcion}
							</p>
						)}
						{data?.cta?.url && (
							<a
								href={data?.cta?.url}
								className="button button-white"
								target={data?.cta?.target}
							>
								<span className="line line-white">
									{data?.cta?.title}
									<span className="line-white-top"></span>
									<span className="line-white-right"></span>
									<span className="line-white-bottom"></span>
									<span className="line-white-left"></span>
								</span>
							</a>
						)}
					</div>
				</div>
			</Swiper>
		</section>
	);
}
