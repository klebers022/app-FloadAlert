import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AlertsScreen from '../screens/AlertsScreen';
import MapScreen from '../screens/MapScreen';
import SheltersScreen from '../screens/SheltersScreen';
import ReportScreen from '../screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Início') {
              iconName = 'home';
            } else if (route.name === 'Alertas') {
              iconName = 'alert-circle';
            } else if (route.name === 'Mapa') {
              iconName = 'map';
            } else if (route.name === 'Abrigos') {
              iconName = 'business';
            } else if (route.name === 'Ocorrências') {
              iconName = 'create';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#005A9C',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Alertas" component={AlertsScreen} />
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Abrigos" component={SheltersScreen} />
        <Tab.Screen name="Ocorrências" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
