import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import BlogCarusel from "../components/UI/BlogCarusel/BlogCarusel";
import BlogCaruselTwoSlides from "../components/UI/BlogCaruselTwoSlides/BlogCaruselTwoSlides";
import FeaturedPosts from "../components/UI/FeaturedPosts/FeaturedPosts";

export default function Component() {
	const { data } = useQuery(GET_PAGE, {
		variables: Component.variables(),
	});

	const { data: menuData } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
			menuHeaderLocation: MENUS.HEADER_LOCATION,
		},
	});

	const { data: firstTwo } = useQuery(GET_FIRST_POSTS);
	const { data: nextFive } = useQuery(GET_NEXT_POSTS);
	const { data: random } = useQuery(GET_RANDOM_POSTS);

	const logo = data?.themeGeneralSettings?.headerFooter?.grupoHeader?.logo;

	const randomizedData = random
		? {
				posts: {
					...random.posts,
					nodes: [...random.posts.nodes].sort(() => Math.random() - 0.5),
				},
		  }
		: null;

	const mostrarCarusel = data?.page?.paginaBlog?.mostrarCarusel;
	const grupoCarusel = data?.page?.paginaBlog?.grupoCarusel;

	if (!firstTwo || !nextFive || !random) return null;

	return (
		<>
			<Header data={menuData} logo={logo} />
			<BlogCarusel data={firstTwo} />
			{mostrarCarusel && (
				<BlogCaruselTwoSlides data={nextFive} grupoCarusel={grupoCarusel} />
			)}
			<FeaturedPosts data={randomizedData} />
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
		$menuHeaderLocation: MenuLocationEnum
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
		menuHeaderMenuItems: menuItems(where: { location: $menuHeaderLocation }) {
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
