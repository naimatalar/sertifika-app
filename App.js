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
import LangApp from './Language';
import DataDetail from './pages/DataDetail';
import CompaniesScreen from './pages/CompaniesScreen';
import PersonScreens from './pages/PersonsScreen';
import ProductScreen from './pages/ProductScreen';
import { Avatar, Button } from 'react-native-paper';
import PageRightContent from './components/PageRightContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { YellowBox } from 'react-native';
import BarcodeScreen from './pages/BarcodeScreen';
import LoginPages from './pages/LoginPages';
console.disableYellowBox = true;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({route, navigation}) => ({ 
        headerStyle: { backgroundColor: '#393185' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (props) => (
          <PageRightContent props={navigation}></PageRightContent>
      )
      })}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Sertifika"}}
      />
            <Stack.Screen
        name="DataDetails"
        component={DataDetail}
        options={{ title: "Sertifika"}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: LangApp("Detail") }}
      />
            <Stack.Screen
        name="Login"
        component={LoginPages}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  );
}

function CompaniesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={({route, navigation}) => ({ 
        headerStyle: { backgroundColor: '#393185' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (props) => (
          <PageRightContent props={navigation}></PageRightContent>
      )
      })}>
      <Stack.Screen
        name="Settings"
        component={CompaniesScreen}
        options={{ title: LangApp("Companies") }}
      />
        <Stack.Screen
        name="DetailsCompany"
        component={DataDetail}
        options={{ title: LangApp("Detail") }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
         <Stack.Screen
        name="Login"
        component={LoginPages}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  );
}

function PersonStack() {
  return (
    <Stack.Navigator
      initialRouteName="Person"
      screenOptions={({route, navigation}) => ({ 
        headerStyle: { backgroundColor: '#393185' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (props) => (
          <PageRightContent props={navigation}></PageRightContent>
      )
      })}>
      <Stack.Screen
        name="PersonScreens"
        component={PersonScreens}
        options={{ title: LangApp("Person") }}
      />
      <Stack.Screen
        name="PersonDetail"
        component={DataDetail}
        options={{ title: LangApp("Detail")  }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
         <Stack.Screen
        name="Login"
        component={LoginPages}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  );
}


function ProductStack() {
  return (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={({route, navigation}) => ({ 
        headerStyle: { backgroundColor: '#393185' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (props) => (
          <PageRightContent props={navigation}></PageRightContent>
      )
      })}>
            <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ title: "Sertifika"}}
      />
        <Stack.Screen
        name="DetailsProduct"
        component={DataDetail}
        options={{ title: LangApp("Detail") }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
         <Stack.Screen
        name="Login"
        component={LoginPages}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  );
}


function BarcodeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Barcode"
      screenOptions={({route, navigation}) => ({ 
        headerStyle: { backgroundColor: '#393185' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (props) => (
          <PageRightContent props={navigation}></PageRightContent>
      )
      })}>
            <Stack.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{ title: "Sertifika"}}
      />

            <Stack.Screen
        name="DetailsDocument"
        component={DetailsScreen}
        options={{ title: LangApp("Detail") }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
            <Stack.Screen
        name="Login"
        component={LoginPages}
        options={{ title: 'Login' }}
      />


    </Stack.Navigator>
  );
}



function App() {
  console.disableYellowBox = false;
  const[data,setData] =React.useState()
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
      
        tabBarOptions={{
          activeTintColor: '#ffa270',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          initialParams={{refreshApp:setData}}
          options={{
            tabBarLabel: 'Sertifika',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="archive-search-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CompaniesStack"
          component={CompaniesStack}
          options={{
            tabBarLabel: LangApp("Companies"),
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
                style={{backgroundColor:"#eeffff",padding:3,marginTop:-20,borderRadius:10,borderColor:"#3f51b5",borderWidth:1,borderStyle:"dashed",overflow:"hidden",shadowColor: "#0041e4",
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
            tabBarLabel: LangApp("Person"),
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
            tabBarLabel:LangApp("Products"),
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
