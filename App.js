import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigator/MainStack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

let access_token = ""
AsyncStorage.getItem("access_token").then((value) => { access_token = value })


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      "apollo-require-preflight": "true",
      "access_token": access_token
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(createUploadLink({
    uri: 'https://3990-36-68-9-1.ngrok-free.app'
  })),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}
