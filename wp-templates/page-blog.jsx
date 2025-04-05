import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useTranslation from "../hooks/useTranslation";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import BlogCarusel from "../components/UI/BlogCarusel/BlogCarusel";
import BlogCaruselTwoSlides from "../components/UI/BlogCaruselTwoSlides/BlogCaruselTwoSlides";
import FeaturedPosts from "../components/UI/FeaturedPosts/FeaturedPosts";
import Footer from "../components/Layout/Footer/Footer";
import Loading from "../components/UI/Loading/Loading";

export default function Component() {
	const { translations } = useTranslation("blog");
	const { data, loading: generalLoading } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { data: menuData, loading: menuLoading } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});

	const { data: firstTwo, loading: firstTwoLoading } = useQuery(GET_FIRST_POSTS);
	const { data: nextFive, loading: nextFiveLoading } = useQuery(GET_NEXT_POSTS);
	const { data: random, loading: randomLoading } = useQuery(GET_RANDOM_POSTS);

	// Verificar cada consulta por separado para carga progresiva
	const headerReady = menuData && data;
	const firstCarouselReady = firstTwo;
	const secondCarouselReady = nextFive && data?.page?.paginaBlog;
	const featuredPostsReady = random;

	// Si no hay datos del header todavía, mostrar un spinner mínimo
	if (!headerReady) {
		return <Loading fullPage={true} />;
	}

	const logo = data?.themeGeneralSettings?.headerFooter?.grupoHeader;
	const mostrarCarusel = data?.page?.paginaBlog?.mostrarCarusel;
	const grupoCarusel = data?.page?.paginaBlog?.grupoCarusel;
	const grupoFooter = data?.themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes = data?.themeGeneralSettings?.configuracionTema?.grupoSocial?.redes;

	// Preparar datos aleatorizados solo si están disponibles
	const randomizedData = random
		? {
				posts: {
					...random.posts,
					nodes: [...random.posts.nodes].sort(() => Math.random() - 0.5),
				},
		  }
		: null;

	return (
		<>
			<Header data={menuData} logo={logo} />
			
			{!firstCarouselReady ? (
				<Loading minHeight="50vh" />
			) : (
				<BlogCarusel data={firstTwo} translations={translations} />
			)}
			
			{mostrarCarusel && !secondCarouselReady ? (
				<Loading minHeight="40vh" />
			) : mostrarCarusel && (
				<BlogCaruselTwoSlides data={nextFive} grupoCarusel={grupoCarusel} translations={translations} />
			)}
			
			{!featuredPostsReady ? (
				<Loading minHeight="30vh" />
			) : (
				<FeaturedPosts data={randomizedData} translations={translations} />
			)}
			
			<Footer logo={logo} data={grupoFooter} redes={redes} />
		</>
	);
}

const GET_FIRST_POSTS = gql`
	query GetFirstPosts {
		posts(first: 2) {
			nodes {
				id
				title
				slug
				featuredImage {
					node {
						sourceUrl
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

const GET_NEXT_POSTS = gql`
	query GetNextPosts {
		posts(first: 5, after: "2") {
			nodes {
				id
				title
				slug
				featuredImage {
					node {
						sourceUrl
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

const GET_RANDOM_POSTS = gql`
	query GetRandomPosts {
		posts(first: 10) {
			nodes {
				id
				title
				slug
				featuredImage {
					node {
						sourceUrl
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
			}
		}
		page(id: $id, idType: DATABASE_ID) {
			paginaBlog {
				mostrarCarusel
				grupoCarusel {
					titulo
					descripcion
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
		id: "2460",
	};
};
