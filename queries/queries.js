import { gql } from "@apollo/client";
import { BlogInfoFragment } from "../fragments/GeneralSettings";

import { NavigationMenu } from "../components/UI/Header/NavigationMenu";

export const GET_FLOATING_MENU = gql`
	query GetFloatingMenu {
		themeGeneralSettings {
			options {
				grupomenufloating {
					items {
						icono {
							mediaItemUrl
						}
            iconoActive {
              mediaItemUrl
            }
						enlace {
							target
							title
							url
						}
					}
				}
			}
		}
	}
`;
