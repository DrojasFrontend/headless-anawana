import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import fetch from 'cross-fetch';

// Configuración de errores para mejorar el manejo
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Configuración del enlace HTTP con opciones optimizadas
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
  fetch,
  fetchOptions: {
    timeout: 30000, // Timeout de 30 segundos
  }
});

// Configuración de caché mejorada
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Políticas para evitar duplicación de datos
        propiedades: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        posts: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});

export default client;
