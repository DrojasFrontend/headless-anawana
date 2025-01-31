"use client";
import Link from "next/link";
import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./FeaturedPosts.module.scss";
let cx = classNames.bind(styles);

import slidePrevNext from "/public/icons/icon-next-slide.svg";

export default function FeaturedPosts({ data }) {
	return (
		<section className="section bg-white py-4 py-lg-5">
			<div className="container">
				<h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">Descubrir artículos</h2>
				<div className="row">
					{data?.posts?.nodes?.map((post, index) => (
						<article key={index} className="col-lg-4 mb-2">
							<Link href={`/${post.slug}`}>
								<a
									className={cx([
										"article",
										"d-flex flex-column shadow rounded",
									])}
								>
									<Image
										src={post?.featuredImage?.node?.sourceUrl}
										alt={post?.title}
										width={post?.featuredImage?.node?.mediaDetails?.width}
										height={post?.featuredImage?.node?.mediaDetails?.height}
									/>
									<div className="p-1">
										<h3 className="fs-6 font-secondary mb-1">{post.title}</h3>
										<span>Leer Articulo</span>
										{/* <span className="button-icon">
											<Image
												src={slidePrevNext}
												alt="ver mas"
												width={18}
												height={18}
											/>
										</span> */}
									</div>
								</a>
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
