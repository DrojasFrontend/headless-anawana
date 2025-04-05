import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useTranslation from "../hooks/useTranslation";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import Carusel from "../components/UI/Carusel/Carusel";
import CardsCarusel from "../components/UI/CardsCarusel/CardsCarusel";
import Propiedades from "../components/UI/Propiedades/Propiedades";
import BannerCarusel from "../components/UI/BannerCarusel/BannerCarusel";
import TextGridThreeImages from "../components/UI/TextGridThreeImages/TextGridThreeImages";
import Footer from "../components/Layout/Footer/Footer";
import Image from "next/image";
// Fragmentos para mejor organización
const HEADER_FOOTER_FRAGMENT = gql`
	fragment HeaderFooterFields on ThemeGeneralSettings {
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
	}
`;

// Consulta para configuración del tema
const THEME_SETTINGS_QUERY = gql`
	query GetThemeSettings {
		themeGeneralSettings {
			...HeaderFooterFields
			configuracionTema {
				grupoSocial {
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
	}
	${HEADER_FOOTER_FRAGMENT}
`;

// Consulta para la página
const PAGE_QUERY = gql`
	query GetPage($id: ID!) {
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
						titulo
						descripcion
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

// Agregar esta nueva consulta después de PAGE_QUERY
const PROPERTIES_QUERY = gql`
	query GetProperties {
		propiedades(first: 10) {
		nodes {
			categoriasDePropiedades(first: 10) {
				nodes {
					name
					slug
					id
					uri
				}
			}	
				title
				id
				slug
				uri
				featuredImage {
					node {
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

export default function Component(props) {
	const { translations } = useTranslation("inicio");
	const [activeTab, setActiveTab] = useState('all');

	// Agregar esta nueva consulta junto a las otras
	const { data: themeData } = useQuery(THEME_SETTINGS_QUERY);
	const { data: pageData } = useQuery(PAGE_QUERY, {
		variables: { id: "15" },
	});
	const { data: menuData } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});
	const { data: propertiesData } = useQuery(PROPERTIES_QUERY);

	const logo = themeData?.themeGeneralSettings?.headerFooter?.grupoHeader;
	const mostrarCarusel = pageData?.page?.paginaInicio?.mostrar;
	const mostrarGaleria = pageData?.page?.paginaInicio?.mostrarGaleria;
	const mostrarGaleriaGrande = pageData?.page?.paginaInicio?.mostrarGaleriaGrande;
	const mostrarTextoImagenes = pageData?.page?.paginaInicio?.mostrarTextoImagenes;
	const dataSlide = pageData?.page?.paginaInicio?.grupoHeroSlider;
	const dataGaleria = pageData?.page?.paginaInicio?.grupoGaleria;
	const dataGaleriaGrande = pageData?.page?.paginaInicio?.grupoGaleriaGrande;
	const dataTextoImagenes = pageData?.page?.paginaInicio?.grupoTextoImagenes;
	const grupoFooter = themeData?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes = themeData?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redesBlanco;

	// Agregar esta constante con las propiedades
	const propiedades = propertiesData?.propiedades?.nodes || [];
	console.log(propiedades);

	// Obtener todas las categorías únicas de las propiedades
	const allCategories = propiedades.reduce((cats, propiedad) => {
		propiedad.categoriasDePropiedades.nodes.forEach(cat => {
			if (!cats.some(existingCat => existingCat.id === cat.id)) {
				cats.push(cat);
			}
		});
		return cats;
	}, []);

	// Filtrar propiedades según la categoría seleccionada
	const propiedadesFiltradas = activeTab === 'all'
		? propiedades
		: propiedades.filter(propiedad =>
			propiedad.categoriasDePropiedades.nodes.some(cat => cat.slug === activeTab)
		);

	return (
		<div>
			<Header data={menuData} logo={logo} translations={translations} />
			{mostrarCarusel && (
				<Carusel data={dataSlide} translations={translations} />
			)}
			{mostrarGaleria && <CardsCarusel data={dataGaleria} translations={translations} />}
			<Propiedades data={propiedadesFiltradas} allCategories={allCategories} activeTab={activeTab} setActiveTab={setActiveTab} translations={translations} />
			{mostrarGaleriaGrande && <BannerCarusel data={dataGaleriaGrande} translations={translations} />}
			{mostrarTextoImagenes && <TextGridThreeImages data={dataTextoImagenes} translations={translations} />}
			<Footer logo={logo} data={grupoFooter} redes={redes} />
		</div>
	);
}

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