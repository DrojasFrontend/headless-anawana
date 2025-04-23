import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useTranslation from "../hooks/useTranslation";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import Hero from "../components/UI/Hero/Hero";
import Items from "../components/UI/Items/Items";
import ImagesTextsItems from "../components/UI/ImagesTextsItems/ImagesTextsItems";
import Footer from "../components/Layout/Footer/Footer";
import MobileMenuBottom from "../components/Layout/MobileMenuBottom";

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
	const mostrarItems = data?.page?.paginaNosotros?.mostrarItems;
	const mostrarImagenesTextosItems = data?.page?.paginaNosotros?.mostrarImagenesTextosItems;

	const grupoHero = data?.page?.paginaNosotros?.grupoHero;
	const grupoItems = data?.page?.paginaNosotros?.grupoItems;
	const grupoImagenesTextosItems = data?.page?.paginaNosotros?.grupoImagenesTextosItems;

	const grupoFooter = data?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes = data?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redes;
	const menuMobile = data?.themeGeneralSettings?.configuracionTema?.grupoMenuMobile?.menu;

	return (
		<div>
			<Header data={menuData} logo={logo} />
			{mostrarHero && <Hero data={grupoHero} translations={translations} />}
			{mostrarItems && <Items data={grupoItems} translations={translations} />}
			{mostrarImagenesTextosItems && <ImagesTextsItems data={grupoImagenesTextosItems} translations={translations} />}
			<Footer logo={logo} data={grupoFooter} redes={redes} />
			<MobileMenuBottom menuItems={menuMobile} />
		</div>
	);
}

Component.query = gql`
	query GetPage($id: ID!) {
		themeGeneralSettings {
			headerFooter {
				grupoHeader {
					logo {
						mediaItemUrl
					}
					logoHover {
						mediaItemUrl
					}
					logoMobile {
						mediaItemUrl
					}
					logoMobileHover {
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
				grupoMenuMobile {
					menu {
						icono {
							mediaItemUrl
						}
						cta {
							target
							title
							url
						}
					}
				}
			}
		}
		page(id: $id, idType: DATABASE_ID) {
			paginaNosotros {
				mostrarHero
				mostrarItems
				mostrarImagenesTextosItems
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
				grupoItems {
					items {
						icono {
							mediaItemUrl
						}
						titulo
						detalle
					}
				}
				grupoImagenesTextosItems {
					tituloPrincipal
					descripcionPrincipal
					imagen1 {
						altText
						mediaItemUrl
					}
					imagen2 {
						altText
						mediaItemUrl
					}
					titulo
					subtitulo
					descripcion
					items {
						titulo
						detalle
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
