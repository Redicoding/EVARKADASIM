import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import MessageScreen from "./screens/MessageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import IlanScreen from './screens/HomeStack/IlanScreen';
import LocationScreen from './screens/HomeStack/LocationScreen';

import Ionicons from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Home' component={TabNavigator} options={{ headerShown: false }} />
//       <Stack.Screen name='Ilan' component={IlanScreen} options={{ headerShown: false }} />
//       <Stack.Screen name='Location' component={LocationScreen} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   )
// }

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Message') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={23} color={color} />
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false, title: "Ana Sayfa" }} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false, title: "Favorilerim" }} />
      <Tab.Screen name='Message' component={MessageScreen} options={{ headerShown: false, title: "Mesaj", tabBarBadge: 4 }} />
      <Tab.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false, title: "Profil" }} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='Ilan' component={IlanScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Location' component={LocationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
