import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigator/MainStack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  const access_token = await AsyncStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      access_token: access_token || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: "https://47bc-36-68-9-138.ngrok-free.app",
    })
  ),
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
