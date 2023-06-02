import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomePage from './HomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClipboardList, faPlus } from '@fortawesome/free-solid-svg-icons';
import FormAdd from './FormAdd';
import LoginForm from './LoginForm';

const Tab = createBottomTabNavigator();
  
export default function TabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Landing"
        component={HomePage}
        options={{
          headerShown : false,
          tabBarLabel: 'Landing',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FormAdd"
        component={FormAdd}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPlus} color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={LoginForm}
        options={{
          headerShown : false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
  
}

const styles = StyleSheet.create({})