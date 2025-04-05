import { useQuery, gql } from "@apollo/client";
import { useFaustQuery } from "@faustwp/core";
import { sanitize } from "../utils/miscellaneous";
import Image from "next/image";
import Link from "next/link";
import * as MENUS from "../constants/menus";

import Header from "../components/Layout/Header/Header";
import Container from "../components/Layout/Container/Container";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import FormatDate from "../components/FormatDate/FormatDate";
import Footer from "../components/Layout/Footer/Footer";

const GET_POST_QUERY = gql`
	query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
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

		post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			date
			author {
			node {
				name
			}
			}
			featuredImage {
			node {
				sourceUrl
				altText
				title
			}
			}
		}
	}
`;

const GET_RECENT_POSTS_QUERY = gql`
	query GetRecentPosts($first: Int!) {
		posts(first: $first) {
			edges {
				node {
					id
					title
					uri
					excerpt
					date
					featuredImage {
						node {
							mediaItemUrl
							altText
							title
						}
					}
				}
			}
		}
	}
`;

export default function Component(props) {

	const { data: menuData } = useQuery(GET_MENUS, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});

	if (props.loading) {
		return <>Loading...</>;
	}
	const { post, themeGeneralSettings, configuracionTema  } = useFaustQuery(GET_POST_QUERY);
	const { posts } = useFaustQuery(GET_RECENT_POSTS_QUERY);
	const recentPosts = posts?.edges ?? [];
	const { title, content, featuredImage, date, author } = post ?? {};

	const logo = themeGeneralSettings?.headerFooter?.grupoHeader;
	const grupoFooter = themeGeneralSettings?.headerFooter?.grupoFooter;
	const redes = themeGeneralSettings?.configuracionTema?.grupoSocial?.redes;

	return (
		<div>
			<Header data={menuData} logo={logo} className="customHeaderBlue" />
			<div className="sectionDetailPost mb-5">
				<Container>
					<div className="sectionDetailPost__grid">
						<section>
							<Breadcrumbs />
							<h1 className="fs-2 text-primary fw-semibold my-1">{title}</h1>
							<div className="sectionDetailPost__img">
								{featuredImage?.node?.sourceUrl && (
									<Image
										layout="fill"
										src={featuredImage.node.sourceUrl}
										priority
										alt={featuredImage.node.altText}
										title={featuredImage.node.title}
										objectFit="cover"
									/>
								)}
							</div>
							<ContentWrapper content={content} />
						</section>
						<section className="sectionSideBar">
							<h2 className="fs-5 text-primary fw-semibold mb-1">Recientes</h2>
							{recentPosts.map((post, index) => (
								<div key={index}>
									<Link href={post?.node?.uri}>
										<a className="sectionDetailPost__post">
											<div className="sectionDetailPost__thumbnail">
												{post?.node?.featuredImage ? (
													<Image
														src={
															post?.node?.featuredImage?.node?.mediaItemUrl
														}
														layout="fill"
														objectFit="cover"
														sizes="100vw"
														alt={featuredImage?.node?.altText}
														title={featuredImage?.node?.title}
													/>
												) : (
													<Image
														src={ImageNotAvailable}
														width={372}
														height={230}
														sizes="100vw"
														alt="Imagen no disponible"
														title="no disponible"
													/>
												)}
											</div>
											<div className="sectionDetailPost__info">
												<h3
													className="fs-small fw-semibold"
													dangerouslySetInnerHTML={{
														__html: sanitize(post?.node?.title),
													}}
												/>

												<p className="fs-small fw-regular text-gray">
													<FormatDate data={post?.node?.date} />
													{post?.node?.date && (
														<time dateTime={post?.node?.date}>
															<FormatDate date={post?.node?.date} />
														</time>
													)}
												</p>
											</div>
										</a>
									</Link>
								</div>
							))}
						</section>
					</div>
				</Container>
			</div>
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

Component.queries = [
	{
		query: GET_POST_QUERY,
		variables: ({ databaseId }, ctx) => ({
			databaseId,
			asPreview: ctx?.asPreview,
		}),
	},
	{
		query: GET_RECENT_POSTS_QUERY,
		variables: () => ({
			first: 5,
		}),
	},
];

