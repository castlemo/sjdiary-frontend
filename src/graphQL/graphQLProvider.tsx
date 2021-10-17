import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useAuth0 } from '../auth0/auth0Wrapper';
import { API_URL } from '../constant';

export const GraphQLProvider = ({
  children,
}: {
  // eslint-disable-next-line react/require-default-props
  children?: JSX.Element;
}): JSX.Element => {
  const { getToken, isAuthenticated } = useAuth0();

  const httpLink = new HttpLink({ uri: API_URL });

  /* istanbul ignore next */
  const authLink = setContext(async () => {
    if (isAuthenticated) {
      const accessToken = await getToken();
      return {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };
    }

    return {
      headers: {
        authorization: 'Bearer ',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
