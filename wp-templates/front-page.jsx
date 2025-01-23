import { useQuery, gql } from "@apollo/client";
import Image from "next/image";

import exampleHero from "/public/img/example-hero.png";
import exampleImg from "/public/img/example-img.png";
import exampleImg2 from "/public/img/example-img-2.png";

import IconInstagram from "../components/SVG/IconInstagram";
import IconFacebook from "../components/SVG/IconFacebook";
import IconYoutube from "../components/SVG/IconYoutube";
import IconWaze from "../components/SVG/IconWaze";
import IconWhatsapp from "../components/SVG/IconWhatsapp";

export default function Component(props) {
	const { data, loading, error } = useQuery(Component.query);

	if (loading) return <div>Cargando...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<section className="sectionMainHero position-relative">
				<Image
					src={exampleHero}
					alt="Descripción de la imagen"
					layout="fill"
					priority
					quality={100}
				/>
				<div className="position-absolute d-flex flex-column justify-content-center align-items-center w-100 h-100 z-1">
					<div className="col-lg-4 m-auto text-center text-white">
						<h1 className="mb-2"> Bienvenido a Anawana</h1>
						<p class="mb-5">
							Las Mejores Casas en Cartagena las Encuentras Aquí.
						</p>
						<a href="">Ver propiedades</a>
					</div>
				</div>
			</section>

			<section className="py-5 overflow-hidden">
				<div className="container pe-0 me-0">
					<h2 className="text-center mb-5">
						Conoce nuestras propiedades en alquiler
					</h2>
					<div className="row">
						<div className="col-lg-2">
							<h3>Cartagena</h3>
						</div>
						<div className="col-lg-10">
							<div className="row">
								<div className="col-lg-4">
									<Image
										src={exampleImg}
										alt="Descripción de la imagen"
										width={519}
										height={543}
									/>
								</div>
								<div className="col-lg-4">
									<Image
										src={exampleImg}
										alt="Descripción de la imagen"
										width={519}
										height={543}
									/>
								</div>
								<div className="col-lg-4">
									<Image
										src={exampleImg}
										alt="Descripción de la imagen"
										width={519}
										height={543}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<div className="d-flex flex-column gap-3">
								<h2>Descubre el encanto del Centro Histórico de Cartagena</h2>
								<p>
									Alquila una casa en el centro histórico de Cartagena y
									disfruta de sus calles, su arquitectura y su ambiente. Vive la
									esencia de la ciudad desde su corazón.
								</p>
								<a href="">Ver más</a>
							</div>
						</div>
						<div className="col-lg-8">
							<div className="row">
								<div className="col-lg-6 position-relative">
									<Image
										src={exampleImg}
										alt="Descripción de la imagen"
										width={519}
										height={543}
									/>
									<div className="position-absolute bottom-0 left-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
										<h3 className="text-white">Casa Kirby</h3>
										<a href="" className="text-white">
											Ver más
										</a>
									</div>
								</div>
								<div className="col-lg-6 position-relative">
									<Image
										src={exampleImg}
										alt="Descripción de la imagen"
										width={519}
										height={543}
									/>
									<div className="position-absolute bottom-0 left-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
										<h3 className="text-white">Casa Kirby</h3>
										<a href="" className="text-white">
											Ver más
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 m-auto text-center">
							<h2 className="mb-3">Naturaleza y paz en Islas del Rosario</h2>
							<p className="mb-5">
								Disfruta de impresionantes vistas al mar desde casas rodeadas de
								naturaleza en las Islas del Rosario. Aquí, la privacidad y el
								paisaje cambia con cada amanecer. Un espacio donde el sonido de
								las olas y la brisa son tus únicos acompañantes.
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8 d-flex">
						<Image
							src={exampleHero}
							alt="Descripción de la imagen"
							width={1000}
							height={560}
						/>
					</div>
					<div className="col-lg-4 d-flex justify-content-lg-end">
						<Image
							src={exampleImg}
							alt="Descripción de la imagen"
							width={500}
							height={560}
						/>
					</div>
				</div>
			</section>

			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 m-auto text-center">
							<h2 className="mb-3">
								Cartagena más cerca que nunca con Anawana
							</h2>
							<p className="mb-5">
								En nuestro blog te llevamos a conocer Cartagena, las Islas del
								Rosario y Barú. Hablamos de su cultura, experiencias ,
								actividades y mucho más. Todo lo que necesitas para vivir y
								sentir estos destinos mientras gozas de nuestras propiedades, lo
								encuentras aquí.
							</p>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-4 position-relative d-flex">
							<Image
								src={exampleImg}
								alt="Descripción de la imagen"
								width={500}
								height={560}
							/>
							<div className="position-absolute bottom-0 left-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
								<h3 className="text-white">Casa Kirby</h3>
								<a href="" className="text-white">
									Ver más
								</a>
							</div>
						</div>
						<div className="col-lg-4 position-relative d-flex">
							<Image
								src={exampleImg}
								alt="Descripción de la imagen"
								width={500}
								height={560}
							/>
							<div className="position-absolute bottom-0 left-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
								<h3 className="text-white">Casa Kirby</h3>
								<a href="" className="text-white">
									Ver más
								</a>
							</div>
						</div>
						<div className="col-lg-4 position-relative d-flex">
							<Image
								src={exampleImg}
								alt="Descripción de la imagen"
								width={500}
								height={560}
							/>
							<div className="position-absolute bottom-0 left-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
								<h3 className="text-white">Casa Kirby</h3>
								<a href="" className="text-white">
									Ver más
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-gray py-5">
				<div className="container">
					<div className="py-5">
						<div className="row">
							<div className="col-lg-3 text-center">
								<h3 className="mb-3">The art of hospitality</h3>
								<p>We have the highest client satisfaction of our industry</p>
							</div>
							<div className="col-lg-3 text-center">
								<h3 className="mb-3">Availability</h3>
								<p>
									Our on-site teams are available anytime during your stay in
									all of our destinations
								</p>
							</div>
							<div className="col-lg-3 text-center">
								<h3 className="mb-3">Confidentiality</h3>
								<p>
									Respecting your privacy is the cornerstone of our relation
									with you
								</p>
							</div>
							<div className="col-lg-3 text-center">
								<h3 className="mb-3">The best offer</h3>
								<p>
									We work directly with our home owners to assure you the best
									prices
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className="sectionFooter py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 text-white">Logo</div>
						<div className="col-lg-6">
							<div className="row">
								<div className="col-lg-6">
									<a href="" className="d-block text-white mb-2">
										Contacto
									</a>
									<a href="" className="d-block text-white mb-2">
										FAQ
									</a>
									<a href="" className="d-block text-white mb-2">
										Política de privacidad
									</a>
									<a href="" className="d-block text-white mb-2">
										Trabaja con nosotros
									</a>
								</div>
								<div className="col-lg-6">
									<div className="row">
										<div className="col-lg-9">
											<a href="" className="d-block text-white mb-2">
												Blog
											</a>
											<a href="" className="d-block text-white mb-2">
												Sobre Nosotros
											</a>
											<a href="" className="d-block text-white mb-2">
												Galeria
											</a>
										</div>
										<div className="col-lg-3">
											<a className="d-block text-white">
												<IconInstagram />
											</a>
											<a className="d-block text-white">
												<IconFacebook />
											</a>
											<a className="d-block text-white">
												<IconYoutube />
											</a>
											<a className="d-block text-white">
												<IconWaze />
											</a>
											<a className="d-block text-white">
												<IconWhatsapp />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

Component.query = gql`
	query GetPageData {
		page(id: "front-page", idType: URI) {
			title
			content
			date
			slug
		}
		generalSettings {
			title
			description
		}
	}
`;
