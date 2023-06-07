import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../Screen/LandingPage";
import TabScreen from "./TabScreen";
import RecipesList from "../components/RecipesList";
import FormAddBahan from "../Screen/FormAddBahan";
import RegisterForm from "../Screen/RegisterForm";
import SearchPage from "../Screen/SearchPage";
import DetailPage from "../Screen/DetailPage";
import AIPage from "../Screen/AIPage";
import ChatScreen from "../components/Chat";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={TabScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecipeList" component={RecipesList} />
      <Stack.Screen name="Tambahkan Bahan dan Langkah" component={FormAddBahan} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} options={{ headerShown: false }} />
      <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="Chat with AI" component={AIPage} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
