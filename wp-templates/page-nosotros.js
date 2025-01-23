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
			<section className="sectionHero position-relative">
				<Image
					src={exampleHero}
					alt="Descripción de la imagen"
					layout="fill"
					priority
					quality={100}
				/>
				<div className="position-absolute d-flex justify-content-center align-items-center w-100 h-100 z-1">
					<h1 className="col-lg-4 m-auto text-center text-white">
						Anawana, más que un destino, una experiencia
					</h1>
				</div>
			</section>

			<section className="pt-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<div className="d-flex flex-column justify-content-center h-100">
								<h2 className="mb-3">Lorem Ipsum</h2>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Repellat facilis rem perferendis reprehenderit, vel debitis
									accusantium doloremque soluta neque laboriosam quam quod
									aliquid voluptate sapiente modi enim praesentium illo
									mollitia. Ipsam nobis praesentium amet a, minima asperiores
									corrupti animi autem voluptate pariatur explicabo ipsa maxime
									sapiente dicta debitis temporibus accusantium aliquid tempore
									ex soluta modi quia repudiandae suscipit. Sint, nostrum.
									Repellat fuga libero illum ea, delectus pariatur, voluptas ad
									saepe natus corrupti voluptatum dolorum odio sequi quae eaque
									tempora voluptatibus, at molestiae quisquam quod fugiat
									facilis temporibus qui? Mollitia, quaerat!
								</p>
							</div>
						</div>
						<div className="col-lg-7 text-center">
							<Image
								src={exampleImg}
								alt="Descripción de la imagen"
								width={519}
								height={543}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 m-auto text-center">
							<h2 className="mb-3">Lorem Ipsum</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Maecenas mi ex, ultrices sed nunc ac, semper vulputate mi.
								Aenean quis interdum risus. Praesent rutrum, sem nec euismod
								hendrerit, augue urna congue risus, quis consequat orci diam
								efficitur velit. Fusce lectus neque, ornare a volutpat et,
								placerat vel nunc. Etiam hendrerit nibh eget arcu convallis, ut
								pulvinar quam tristique.
							</p>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col-lg-6 d-flex">
							<Image
								src={exampleImg2}
								alt="Descripción de la imagen"
								width={660}
								height={543}
							/>
						</div>
						<div className="col-lg-6 d-flex">
							<Image
								src={exampleImg2}
								alt="Descripción de la imagen"
								width={660}
								height={543}
							/>
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
    page(id: "nosotros", idType: URI) {
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
