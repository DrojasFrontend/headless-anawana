import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useTranslation from "../hooks/useTranslation";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import Hero from "../components/UI/Hero/Hero";
import Forms from "../components/Forms/Forms";
import Footer from "../components/Layout/Footer/Footer";
import MobileMenuBottom from "../components/Layout/MobileMenuBottom";

export default function Component(props) {
	const { translations } = useTranslation("contacto");
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { data: menuData } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});

	const logo = data?.themeGeneralSettings?.headerFooter?.grupoHeader;
	const mostrarHero = data?.page?.paginaContacto?.mostrarHero;
	const grupoHero = data?.page?.paginaContacto?.grupoHero;
	const tituloContacto = data?.page?.paginaContacto?.grupoFormulario?.titulo;
	const imagenContacto = data?.page?.paginaContacto?.grupoFormulario?.imagen;
	const grupoConfiguracionTemaRedes =
	data?.themeGeneralSettings?.configuracionTema?.grupoSocial.redes;
	const grupoConfiguracionTemaContactos =
		data?.themeGeneralSettings?.configuracionTema?.grupoContacto?.contactos;
	const grupoFooter = data?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes =
		data?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redes;
	const menuMobile = data?.themeGeneralSettings?.configuracionTema?.grupoMenuMobile?.menu;

	return (
		<div>
			<Header data={menuData} logo={logo} />
			{mostrarHero && <Hero data={grupoHero} translations={translations} />}
			<Forms
				titulo={tituloContacto}
				imagen={imagenContacto}
				translations={translations}
			/>
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
			paginaContacto {
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
				grupoFormulario {
					titulo
					imagen {
						mediaItemUrl
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
		id: "2512",
	};
};
