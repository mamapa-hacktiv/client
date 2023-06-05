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
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg1OTI5MzYyfQ.GwvvD5-hP5hykhYgthL5yKGkQGIySAq1g_DmWGjPD-o"
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(createUploadLink({
    uri: 'https://1aba-36-68-9-1.ngrok-free.app'
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
