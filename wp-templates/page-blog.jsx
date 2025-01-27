import { useQuery, gql } from "@apollo/client";
import BlogCarusel from "../components/UI/BlogCarusel/BlogCarusel";
import BlogCaruselTwoSlides from "../components/UI/BlogCaruselTwoSlides/BlogCaruselTwoSlides";
import FeaturedPosts from "../components/UI/FeaturedPosts/FeaturedPosts";

export default function Component() {
	const { data } = useQuery(GET_PAGE, {
		variables: Component.variables(),
	});
	const { data: firstTwo } = useQuery(GET_FIRST_POSTS);
	const { data: nextFive } = useQuery(GET_NEXT_POSTS);
	const { data: random } = useQuery(GET_RANDOM_POSTS);

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

Component.variables = () => {
	return {
		id: "2460",
	};
};
