import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Page Imports
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Logout from './pages/Logout';
import Feed from './pages/Feed';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Search from './pages/Search';
import FriendRequests from './pages/FriendRequests';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Bottom Tab Navigation
function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} options={{
        headerStyle: { backgroundColor: '#EFCC00' }, headerTitleAlign: 'center', tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ), title: "Your Feed"
      }} />
      <Tab.Screen name="Your Profile" component={Profile} options={{
        headerStyle: { backgroundColor: '#EFCC00' }, headerTitleAlign: 'center', tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Friends" component={Friends} options={{
        headerStyle: { backgroundColor: '#EFCC00' }, headerTitleAlign: 'center', tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-multiple" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Requests" component={FriendRequests} options={{
        headerStyle: { backgroundColor: '#EFCC00' }, headerTitleAlign: 'center', tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-plus" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Add Friends" component={Search} options={{
        headerStyle: { backgroundColor: '#EFCC00' }, headerTitleAlign: 'center', tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Logout" component={Logout} options={{
        headerStyle: { backgroundColor: '#EFCC00' }, headerTitleAlign: 'center', tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="logout" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}
//Stack Navigation
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
      >
        <Stack.Screen
          name="Home"
          component={Main}
          options={{ headerShown: false, }}

        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerStyle: { backgroundColor: '#EFCC00' } }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;