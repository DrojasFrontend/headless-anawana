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
