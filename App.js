import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { firebase } from "./firebaseconfig";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import MessageScreen from "./screens/MessageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import IlanScreen from './screens/HomeStack/IlanScreen';
import LocationScreen from './screens/HomeStack/LocationScreen';
import ProfileUpdateScreen from './screens/HomeStack/ProfileUpdateScreen';

import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Login/RegisterScreen";

import Ionicons from "react-native-vector-icons/Ionicons"
import ForgetPasswordScreen from './screens/Login/ForgetPasswordScreen';
import AddilanScreen from './screens/AddilanScreen';
import UserIlanScreen from './screens/HomeStack/UserIlanScreen';
import AboutScreen from './screens/HomeStack/AboutScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomButton = ({ child, onPress }) => {
  <TouchableOpacity className="-top-8 justify-center items-center" onPress={onPress}>
    <View className="w-16 h-16 rounded-full bg-red-400">
      {child}
    </View>
  </TouchableOpacity>
}


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Message') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Addilan') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={23} color={color} />
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: { position: "absolute" }
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false, title: "Ana Sayfa" }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false, title: "Favorilerim" }} />
      <Tab.Screen name="Addilan" component={AddilanScreen} options={{ headerShown: false, title: "Ilan Ekle" }} />
      <Tab.Screen name='Message' component={MessageScreen} options={{ headerShown: false, title: "Mesaj", tabBarBadge: 2 }} />
      <Tab.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false, title: "Profil" }} />
    </Tab.Navigator>
  )
}

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthState = (u) => {
    setUser(u);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthState);
    return subscriber;
  }, [])

  if (initializing) return null;


  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='LogIn' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }


  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='Ilan' component={IlanScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Location' component={LocationScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ProfileUpdate' component={ProfileUpdateScreen} options={{ headerShown: false }} />
      <Stack.Screen name='UserIlan' component={UserIlanScreen} options={{ headerShown: false }} />
      <Stack.Screen name='About' component={AboutScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
