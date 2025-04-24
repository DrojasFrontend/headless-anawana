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

export default function BlogCarusel({ data, grupoCarusel, translations }) {
	console.log("BlogCaruselTwoSlides data:", data);
	return (
		<section className="sectionBlogCaruselTwoSlides bg-white-100 py-4 py-lg-5">
			<div className="px-1">
				<div className="row">
					<div className="col-xl-3 mb-3">
						{grupoCarusel.titulo && (
							<h2 className="font-base fs-2 fw-light mb-1">
								{translations.sectionBlogCaruselTwoSlidesTitulo || grupoCarusel.titulo}
							</h2>
						)}

						{grupoCarusel.descripcion && (
							<p className="text-gray mb-3">{translations.sectionBlogCaruselTwoSlidesDescripcion || grupoCarusel.descripcion}</p>
						)}

						<div className="col-1 position-relative m-auto">
							<div className="swiper-button-prev">
							</div>
							<div className="swiper-button-next">
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
							speed={200000000}
							navigation={{
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							}}
							// onSlideChange={() => console.log('slide change')}
							className="mySwiper"
						>
							{data?.posts?.nodes?.map((post, index) => (
								<SwiperSlide key={index}>
									<div className={cx(["slide", "position-relative text-center d-flex"])}>
										<a href={`/${post.slug}`} className={cx("slide", "d-flex")}>
											<Image
												src={post?.featuredImage?.node?.sourceUrl}
												alt={post?.title}
												width={500}
												height={600}
												objectFit="cover"
											/>
											<div className="position-absolute bottom-0 left-0 h-100 w-100 p-1 z-1 d-flex align-items-end z-2">
												<p className="fs-p text-white text-start">{post.title}</p>
											</div>
										</a>
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
