import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomePage from './HomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipesList from '../components/RecipesList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClipboardList, faPlus } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
  
  function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }
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
        name="RecipeList"
        component={RecipesList}
        options={{
            tabBarLabel: 'RecipesList',
            tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon={faClipboardList} color={color} size={size}/>
            ),
          }}
      />
      <Tab.Screen
        name="FormAdd"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPlus} color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
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