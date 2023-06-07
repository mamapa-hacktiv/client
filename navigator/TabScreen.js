import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomePage from '../Screen/HomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClipboardList, faPlus } from '@fortawesome/free-solid-svg-icons';
import FormAdd from '../Screen/FormAdd';
import LoginForm from '../Screen/LoginForm';
import Favorit from '../Screen/Favorit';
import Profil from '../Screen/Profil';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomePage}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorit"
                component={Favorit}
                options={{

                    tabBarLabel: 'Favorit',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="heart" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Tambahkan resep makanan mu"
                component={FormAdd}
                options={{
                    tabBarLabel: 'Tambah Resep',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faPlus} color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Profile"
                component={LoginForm}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Profiles"
                component={Profil}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>

    );

}

const styles = StyleSheet.create({})