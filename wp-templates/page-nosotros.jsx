import { useQuery, gql } from "@apollo/client";

import Hero from "../components/UI/Hero/Hero";
import TextImageTwo from "../components/UI/TextImageTwo/TextImageTwo";
import TextImageTwoHorizontal from "../components/UI/TextImageTwoHorizontal/TextImageTwoHorizontal";

export default function Component(props) {
	const { data } = useQuery(GET_PAGE, {
		variables: Component.variables(),
	});

	const mostrarTextoImagenes = data?.page?.paginaNosotros?.mostrarTextoImagenes;
	const mostrarHero = data?.page?.paginaNosotros?.mostrarHero;
	const mostrarTextoImagenesHorizontales =
		data?.page?.paginaNosotros?.mostrarTextoImagenesHorizontales;

	const grupoHero = data?.page?.paginaNosotros?.grupoHero;
	const grupoTextoImagenes = data?.page?.paginaNosotros?.grupoTextoImagenes;
	const grupoTextoImagenesHorizontales =
		data?.page?.paginaNosotros?.grupoTextoImagenesHorizontales;

	return (
		<div>
			{mostrarHero && <Hero data={grupoHero} />}
			{mostrarTextoImagenes && <TextImageTwo data={grupoTextoImagenes} />}
			{mostrarTextoImagenesHorizontales && <TextImageTwoHorizontal data={grupoTextoImagenesHorizontales} />}
		</div>
	);
}

const GET_PAGE = gql`
	query GetPage($id: ID!) {
		page(id: $id, idType: DATABASE_ID) {
			paginaNosotros {
				mostrarHero
				mostrarTextoImagenes
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

Component.variables = () => {
	return {
		id: "77",
	};
};
