import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feed from './src/screens/Feed';
import Search from './src/screens/Search';


const Tab = createBottomTabNavigator();
function MyTabs() 
{
  return (
    <Tab.Navigator
    
      initialRouteName="Feed"
      screenOptions=
      {{
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Instagram"
        component={Feed}
        options={{ 
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default function App() 
{
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
