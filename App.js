// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';

import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailsScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';
console.disableYellowBox = true;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}

function PersonStack() {
  return (
    <Stack.Navigator
      initialRouteName="Person"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}


function ProductStack() {
  return (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}


function BarcodeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Barcode"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}



function App() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="SettingsStack"
        tabBarOptions={{
          activeTintColor: '#ffa270',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Ara',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="archive-search-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Firmalar',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="office-building-outline"
                color={color}
                size={size}
              />
              
            ),
          }}
        />

      <Tab.Screen
          name="BarcodeStack"
          component={BarcodeStack}
          
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="barcode"
                color={color}
                size={40}
                style={{backgroundColor:"#eeffff",padding:3,marginTop:-20,borderRadius:"10px",borderColor:"#3f51b5",borderWidth:1,borderStyle:"dashed",overflow:"hidden",shadowColor: "#0041e4",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity:  0.21,
                shadowRadius: 6.65,
                elevation: 9}}
              />
            ),
            
          }}
          
        />
        <Tab.Screen
          name="PersonStack"
          component={PersonStack}
          options={{
            tabBarLabel: 'Kişiler',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-box-multiple-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        
        <Tab.Screen
          name="ProductStack"
          component={ProductStack}
          options={{
            tabBarLabel: 'Ürünler',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="gift-open"
                color={color}
                size={size}
              />
            ),
          }}
        />

      </Tab.Navigator>

    </NavigationContainer>
  );
}

export default App;
