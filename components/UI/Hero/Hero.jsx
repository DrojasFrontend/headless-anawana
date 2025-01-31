import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./Hero.module.scss";
let cx = classNames.bind(styles);

import banner from "/public/img/slide-background-1.jpg";

export default function Hero({ data }) {
	return (
		<section className={cx(["bg", "position-relative"])}>
			
			<Image
				src={data?.imagen?.mediaItemUrl}
				alt={data?.imagen?.altText}
				layout="fill"
				objectFit="cover"
			/>
			<div
				className={cx([
					"content",
					"content position-absolute top-0 left-0 w-100 h-100 z-1 d-flex align-items-center justify-content-center",
				])}
			>
				<div className="col-lg-7">
					{data.titulo && (
						<h1 className="fs-1 text-white text-center text-uppercase fw-light">
							{data.titulo}
						</h1>
					)}
				</div>
			</div>
		</section>
	);
}
