import { gql } from "@apollo/client";

export const BlogInfoFragment = gql`
	fragment BlogInfoFragment on GeneralSettings {
		title
		description
	}
`;

export const IMAGE_FRAGMENT = gql`
	fragment ImageFragment on MediaItem {
		altText
		mediaItemUrl
		mediaDetails {
			width
			height
		}
	}
`;

export const CTA_FRAGMENT = gql`
	fragment CTAFragment on AcfLink {
		target
		title
		url
	}
`;
