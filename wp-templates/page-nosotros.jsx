import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useTranslation from "../hooks/useTranslation";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import Hero from "../components/UI/Hero/Hero";
import TextImage from "../components/UI/TextImage/TextImage";
import TextImageTwo from "../components/UI/TextImageTwo/TextImageTwo";
import TextGridImages from "../components/UI/TextGridImages/TextGridImages";
import TextImageTwoHorizontal from "../components/UI/TextImageTwoHorizontal/TextImageTwoHorizontal";
import Footer from "../components/Layout/Footer/Footer";

export default function Component(props) {
	const { translations } = useTranslation("nosotros");
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { data: menuData } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});

	const logo = data?.themeGeneralSettings?.headerFooter?.grupoHeader;

	const mostrarHero = data?.page?.paginaNosotros?.mostrarHero;
	const mostrarTextoImagen = data?.page?.paginaNosotros?.mostrarTextoImagen;
	const mostrarTextoImagenes = data?.page?.paginaNosotros?.mostrarTextoImagenes;
	const mostrarTextoGridImagenes = data?.page?.paginaNosotros?.mostrarTextoGridImagenes;
	const mostrarTextoImagenesHorizontales = data?.page?.paginaNosotros?.mostrarTextoImagenesHorizontales;

	const grupoHero = data?.page?.paginaNosotros?.grupoHero;
	const grupoTextoImagen = data?.page?.paginaNosotros?.grupoTextoImagen;
	const grupoTextoImagenes = data?.page?.paginaNosotros?.grupoTextoImagenes;
	const grupoTextoGridImagenes = data?.page?.paginaNosotros?.grupoTextoGridImagenes;
	const grupoTextoImagenesHorizontales = data?.page?.paginaNosotros?.grupoTextoImagenesHorizontales;

	const grupoFooter = data?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes = data?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redes;

	return (
		<div>
			<Header data={menuData} logo={logo} />
			{mostrarHero && <Hero data={grupoHero} translations={translations} />}
			{mostrarTextoImagen && <TextImage data={grupoTextoImagen} translations={translations} />}
			{mostrarTextoImagenes && <TextImageTwo data={grupoTextoImagenes} translations={translations} />}
			{mostrarTextoGridImagenes && (<TextGridImages data={grupoTextoGridImagenes} translations={translations} />)}
			{mostrarTextoImagenesHorizontales && (<TextImageTwoHorizontal data={grupoTextoImagenesHorizontales} translations={translations} />)}
			<Footer logo={logo} data={grupoFooter} redes={redes} />
		</div>
	);
}

Component.query = gql`
	query GetPage($id: ID!) {
		themeGeneralSettings {
			headerFooter {
				grupoHeader {
					logo {
						altText
						mediaItemUrl
					}
					logoHover {
						altText
						mediaItemUrl
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
			paginaNosotros {
				mostrarHero
				mostrarTextoImagen
				mostrarTextoImagenes
				mostrarTextoGridImagenes
				mostrarTextoImagenesHorizontales
				grupoHero {
					titulo
					imagen {
						altText
						mediaItemUrl
						mediaDetails {
							height
							width
						}
					}
				}
				grupoTextoImagen {
					titulo
					descripcion
					cta {
						target
						title
						url
					}
					imagen {
						altText
						mediaItemUrl
						mediaDetails {
							height
							width
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
				grupoTextoGridImagenes {
					titulo
					descripcion
					cta {
						target
						title
						url
					}
					imagenes {
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
				grupoTextoImagenesHorizontales {
					titulo
					descripcion
					cta {
						target
						title
						url
					}
					imagenes {
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
	query GetMenus(
		$headerLocation: MenuLocationEnum
	) {
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
		id: "77",
	};
};
