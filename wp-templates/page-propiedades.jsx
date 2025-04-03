import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useTranslation from "../hooks/useTranslation";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import Hero from "../components/UI/Hero/Hero";
import Footer from "../components/Layout/Footer/Footer";

export default function Component(props) {
	const { translations } = useTranslation("propiedades");
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { data: menuData } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});

	const logo = data?.themeGeneralSettings?.headerFooter?.grupoHeader;
	const mostrarHero = data?.page?.paginaPropiedades?.mostrarHero;
	const grupoHero = data?.page?.paginaPropiedades?.grupoHero;
	const grupoConfiguracionTemaRedes =
	data?.themeGeneralSettings?.configuracionTema?.grupoSocial.redes;
	const grupoConfiguracionTemaContactos =
		data?.themeGeneralSettings?.configuracionTema?.grupoContacto?.contactos;
	const grupoFooter = data?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes =
		data?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redes;

	return (
		<div>
			<Header data={menuData} logo={logo} />
			{mostrarHero && <Hero data={grupoHero} translations={translations} />}
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
				grupoContacto {
					contactos {
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
			paginaPropiedades {
				mostrarHero
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
		id: "2653",
	};
};
