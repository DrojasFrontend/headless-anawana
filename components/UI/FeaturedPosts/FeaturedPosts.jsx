"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./FeaturedPosts.module.scss";
let cx = classNames.bind(styles);

import slidePrevNext from "/public/icons/icon-next-slide.svg";

export default function FeaturedPosts({ data, translations }) {
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;
	
	// Calcular el total de páginas
	const posts = data?.posts?.nodes || [];
	const totalPages = Math.ceil(posts.length / postsPerPage);
	
	// Calcular los posts que se muestran en la página actual
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	
	// Función para cambiar de página
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	
	return (
		<section className="sectionFeaturedPosts bg-white py-4 py-lg-5">
			<div className="container-fluit px-1">
				<h2 className="font-base fs-2 fw-light mb-1">{translations.sectionFeaturedPostsTitulo || 'Descubrir artículos'}</h2>
				<div className="row">
					{currentPosts.map((post, index) => (
						<article key={index} className="col-lg-4 mb-2">
							<Link href={`/${post.slug}`}>
								<a
									className={cx([
										"article",
										"d-flex flex-column shadow rounded h-100",
									])}
								>
									<Image
										src={post?.featuredImage?.node?.sourceUrl}
										alt={post?.title}
										width={post?.featuredImage?.node?.mediaDetails?.width || 500}
										height={post?.featuredImage?.node?.mediaDetails?.height || 300}
									/>
									<div className="p-1">
										<h3 className="fs-6 font-secondary mb-1">{post.title}</h3>
										<span className="font-secondary fs-small">{translations?.readArticle || 'Leer articulo'}</span>
									</div>
								</a>
							</Link>
						</article>
					))}
				</div>
				
				{/* Paginación */}
				{totalPages > 1 && (
					<div className="d-flex justify-content-center mt-3">
						<ul className="pagination">
							<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
								<button 
									className="page-link" 
									onClick={() => paginate(currentPage - 1)}
									disabled={currentPage === 1}
								>
									Anterior
								</button>
							</li>
							
							{[...Array(totalPages)].map((_, i) => (
								<li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
									<button 
										className="page-link" 
										onClick={() => paginate(i + 1)}
									>
										{i + 1}
									</button>
								</li>
							))}
							
							<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
								<button 
									className="page-link" 
									onClick={() => paginate(currentPage + 1)}
									disabled={currentPage === totalPages}
								>
									Siguiente
								</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</section>
	);
}
