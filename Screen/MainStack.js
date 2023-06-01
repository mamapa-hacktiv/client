import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './LandingPage'
import TabScreen from './TabScreen';
import RecipesList from '../components/RecipesList';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown : false}} />
            <Stack.Screen name="Home" component={TabScreen} options={{ headerShown : false}}  />
            <Stack.Screen name="RecipeList" component={RecipesList}  />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})