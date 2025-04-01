import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./BlogCarusel.module.scss";
let cx = classNames.bind(styles);

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Importar estilos
import "swiper/css";
import "swiper/css/effect-fade";

export default function BlogCarusel({ data, translations }) {
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
				{data?.posts?.nodes?.map((post, index) => (
					<SwiperSlide key={index}>
						<div className={cx(["slide", "position-relative"])}>
							<Image
								src={post?.featuredImage?.node?.sourceUrl}
								alt={post?.title}
								width={post?.featuredImage?.node?.width}
								height={post?.featuredImage?.node?.height}
								layout="fill"
								objectFit="cover"
							/>
						</div>
						<div
							className={cx([
								"content",
								"position-absolute top-0 left-0 w-100 h-100 z-1 d-flex align-items-center",
							])}
						>
							<div className="container-fluit px-1">
								<div className="row">
									<div className="col-lg-7 m-auto">
										{post?.title && (
											<h1 className="fs-2 text-white text-center text-uppercase fw-light mb-1">
												{post?.title}
											</h1>
										)}
										{post?.slug && (
											<a
												href={post?.slug}
												className="button button-white m-auto"
											>
												<span className="line line-white">
													Leer articulo
													<span className="line-white-top"></span>
													<span className="line-white-right"></span>
													<span className="line-white-bottom"></span>
													<span className="line-white-left"></span>
												</span>
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
