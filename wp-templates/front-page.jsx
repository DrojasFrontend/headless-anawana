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
import Loading from "../components/UI/Loading/Loading";
import Image from "next/image";
import MobileMenuBottom from "../components/Layout/MobileMenuBottom";
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
						cta {
							url
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
	const { data: themeData, loading: themeLoading } = useQuery(THEME_SETTINGS_QUERY);
	const { data: pageData, loading: pageLoading } = useQuery(PAGE_QUERY, {
		variables: { id: "15" },
	});
	const { data: menuData, loading: menuLoading } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});
	const { data: propertiesData, loading: propertiesLoading } = useQuery(PROPERTIES_QUERY);

	// Verificar cada consulta por separado para carga progresiva
	const headerReady = menuData && themeData;
	const contentReady = pageData;
	const propiedadesReady = propertiesData;

	// Si no hay datos del header todavía, mostrar un spinner mínimo
	if (!headerReady) {
		return <Loading fullPage={true} />;
	}

	const logo = themeData?.themeGeneralSettings?.headerFooter?.grupoHeader;
	const redes = themeData?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redesBlanco;
	const grupoFooter = themeData?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const menuMobile = themeData?.themeGeneralSettings?.configuracionTema?.grupoMenuMobile?.menu;

	// Propiedades con fallback para evitar errores mientras cargan
	const propiedades = propertiesData?.propiedades?.nodes || [];

	// Obtener todas las categorías únicas solo si los datos están disponibles
	const allCategories = propiedadesReady
		? propiedades.reduce((cats, propiedad) => {
			propiedad.categoriasDePropiedades.nodes.forEach(cat => {
				if (!cats.some(existingCat => existingCat.id === cat.id)) {
					cats.push(cat);
				}
			});
			return cats;
		}, [])
		: [];

	// Filtrar propiedades según la categoría seleccionada
	const propiedadesFiltradas = activeTab === 'all'
		? propiedades
		: propiedades.filter(propiedad =>
			propiedad.categoriasDePropiedades.nodes.some(cat => cat.slug === activeTab)
		);

	// Variables condicionales para contenido
	const mostrarCarusel = contentReady && pageData?.page?.paginaInicio?.mostrar;
	const mostrarGaleria = contentReady && pageData?.page?.paginaInicio?.mostrarGaleria;
	const mostrarGaleriaGrande = contentReady && pageData?.page?.paginaInicio?.mostrarGaleriaGrande;
	const mostrarTextoImagenes = contentReady && pageData?.page?.paginaInicio?.mostrarTextoImagenes;
	const dataSlide = contentReady ? pageData?.page?.paginaInicio?.grupoHeroSlider : null;
	const dataGaleria = contentReady ? pageData?.page?.paginaInicio?.grupoGaleria : null;
	const dataGaleriaGrande = contentReady ? pageData?.page?.paginaInicio?.grupoGaleriaGrande : null;
	const dataTextoImagenes = contentReady ? pageData?.page?.paginaInicio?.grupoTextoImagenes : null;

	return (
		<div>
			<Header data={menuData} logo={logo} translations={translations} />

			{!contentReady && <Loading minHeight="50vh" />}

			{mostrarCarusel && (
				<Carusel data={dataSlide} translations={translations} />
			)}

			{mostrarGaleria && <CardsCarusel data={dataGaleria} translations={translations} />}

			{!propiedadesReady ? (
				<Loading minHeight="30vh" />
			) : (
				<Propiedades
					data={propiedadesFiltradas}
					allCategories={allCategories}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					translations={translations}
				/>
			)}

			{mostrarGaleriaGrande && <BannerCarusel data={dataGaleriaGrande} translations={translations} />}
			{mostrarTextoImagenes && <TextGridThreeImages data={dataTextoImagenes} translations={translations} />}

			<Footer logo={logo} data={grupoFooter} redes={redes} />
			<MobileMenuBottom menuItems={menuMobile} />
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