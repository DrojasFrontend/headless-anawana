import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./BlogCaruselTwoSlides.module.scss";
let cx = classNames.bind(styles);

import slidePrevNext from "/public/icons/icon-next-slide.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Importar estilos
import "swiper/css";
import "swiper/css/effect-fade";

export default function BlogCarusel({ data, grupoCarusel }) {
	console.log(grupoCarusel);
	return (
		<section className="section bg-white-100 py-4 py-lg-5">
			<div className="px-1">
				<div className="row">
					<div className="col-xl-3 mb-3">
						{grupoCarusel.titulo && (
							<h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">
								{grupoCarusel.titulo}
							</h2>
						)}

						{grupoCarusel.descripcion && (
							<p className="text-gray mb-3">{grupoCarusel.descripcion}</p>
						)}
						
						<div className="col-1 position-relative m-auto">
							<div className="swiper-button-prev">
								<Image
									src={slidePrevNext}
									alt="Slide 1"
									width={18}
									height={14}
								/>
							</div>
							<div className="swiper-button-next">
								<Image
									src={slidePrevNext}
									alt="Slide 1"
									width={18}
									height={14}
								/>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<Swiper
							modules={[Autoplay, Navigation, Pagination, EffectFade]}
							spaceBetween={18}
							slidesPerView={1}
							breakpoints={{
								680: {
									slidesPerView: 2,
								},
								992: {
									slidesPerView: 3,
								},
								1200: {
									slidesPerView: 3,
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
							// onSlideChange={() => console.log('slide change')}
							className="mySwiper"
						>
							{data?.posts?.nodes?.map((post, index) => (
								<SwiperSlide key={index}>
									<div className={cx(["slide", "position-relative text-center"])}>
										<Image
											src={post?.featuredImage?.node?.sourceUrl}
											alt={post?.title}
											width={500}
											height={600}
											objectFit="cover"
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
