import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import useTranslation from "../hooks/useTranslation";

import Header from "../components/Layout/Header/Header";
import Carusel from "../components/UI/Carusel/Carusel";
import CardsCarusel from "../components/UI/CardsCarusel/CardsCarusel";
import BannerCarusel from "../components/UI/BannerCarusel/BannerCarusel";
import TextGridThreeImages from "../components/UI/TextGridThreeImages/TextGridThreeImages";
import Footer from "../components/Layout/Footer/Footer";

export default function Component(props) {
	const { translations } = useTranslation("inicio");
	const { data } = useQuery(GET_PAGE, {
		variables: Component.variables(),
	});

	const { data: menuData } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});

	const logo = data?.themeGeneralSettings?.headerFooter?.grupoHeader?.logo;

	const mostrarCarusel = data?.page?.paginaInicio?.mostrar;
	const mostrarGaleria = data?.page?.paginaInicio?.mostrarGaleria;
	const mostrarGaleriaGrande = data?.page?.paginaInicio?.mostrarGaleriaGrande;
	const mostrarTextoImagenes = data?.page?.paginaInicio?.mostrarTextoImagenes;
	const dataSlide = data?.page?.paginaInicio?.grupoHeroSlider;
	const dataGaleria = data?.page?.paginaInicio?.grupoGaleria;
	const dataGaleriaGrande = data?.page?.paginaInicio?.grupoGaleriaGrande;
	const dataTextoImagenes = data?.page?.paginaInicio?.grupoTextoImagenes;
	const grupoFooter = data?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes = data?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redesBlanco;

	return (
		<div>
			<Header data={menuData} logo={logo} />
			{mostrarCarusel && (
				<Carusel data={dataSlide} translations={translations} />
			)}
			{mostrarGaleria && <CardsCarusel data={dataGaleria} />}
			{mostrarGaleriaGrande && <BannerCarusel data={dataGaleriaGrande} />}
			{mostrarTextoImagenes && <TextGridThreeImages data={dataTextoImagenes} />}

			<Footer logo={logo} data={grupoFooter} redes={redes} />
		</div>
	);
}

const GET_PAGE = gql`
	query GetPage($id: ID!) {
		themeGeneralSettings {
			headerFooter {
				grupoHeader {
					logo {
						altText
						mediaItemUrl
						mediaDetails {
							width
							height
						}
					}
				}
				grupoFooter {
					menus {
						tituloMenu
						items {
							cta {
								url
								title
								target
							}
						}
					}
				}
			}
			configuracionTema {
				grupoSocial {
					redes {
						cta {
							target
							title
							url
						}
						icono {
							mediaItemUrl
						}
					}
					redesBlanco {
						cta {
							target
							title
							url
						}
						icono {
							mediaItemUrl
						}
					}
				}
			}
		}
		page(id: $id, idType: DATABASE_ID) {
			paginaInicio {
				mostrar
				mostrarGaleria
				mostrarGaleriaGrande
				mostrarTextoImagenes
				grupoHeroSlider {
					titulo
					descripcion
					cta {
						target
						title
						url
					}
					slides {
						imagen {
							altText
							mediaItemUrl
							mediaDetails {
								height
								width
							}
						}
					}
				}
				grupoGaleria {
					titulo
					descripcion
					cta {
						target
						title
						url
					}
					slides {
						imagen {
							altText
							mediaItemUrl
							mediaDetails {
								height
								width
							}
						}
					}
				}
				grupoGaleriaGrande {
					titulo
					descripcion
					cta {
						target
						title
						url
					}
					slides {
						imagen {
							altText
							mediaItemUrl
							mediaDetails {
								height
								width
							}
						}
					}
					items {
						titulo
						detalle
						icono {
							altText
							mediaItemUrl
							mediaDetails {
								height
								width
							}
						}
					}
				}
				grupoTextoImagenes {
					titulo
					descripcion
					cta {
						target
						title
						url
					}
					imagenes {
						titulo
						detalle
						imagen {
							altText
							mediaItemUrl
							mediaDetails {
								height
								width
							}
						}
					}
				}
			}
		}
	}
`;

const GET_MENUS = gql`
	query GetMenus($headerLocation: MenuLocationEnum) {
		headerMenuItems: menuItems(where: { location: $headerLocation }) {
			nodes {
				id
				path
				label
				target
				cssClasses
			}
		}
	}
`;

Component.variables = () => {
	return {
		id: "15",
	};
};
