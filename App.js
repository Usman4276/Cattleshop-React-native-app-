import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Button, StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
// import Register from './Components/Form';
import Events from './Components/Events';
import Cart from './Components/Cart';
import {Home1, Register1, Sheeps1} from './Components/customNav'
import Login from './Components/Login';
import Sheeps from './Components/Sheeps';
// import Login from './Components/Login';




const Tab = createBottomTabNavigator()
const TabNavigator = () => {

  return(

    <Tab.Navigator tabBarOptions={{
      activeBackgroundColor:"#dcdcdc",
      activeTintColor:"black",
      inactiveBackgroundColor:"#eee",
      inactiveTintColor: "black"
      
    }} 
    
    >
    <Tab.Screen name="Home" component={Home1} options={{
      tabBarIcon: () => { return <AntDesign name="home" size={20} color="black"  /> }
    }}/>
    <Tab.Screen name="Events" component={Events} options={{
      tabBarIcon: () => { return <MaterialIcons name="event-note" size={22} color="black" />} 
    }}/>
    <Tab.Screen name="Cart" component={Cart} options={{
      tabBarIcon: () => { return <AntDesign name="shoppingcart" size={22} color="black" />}
    }}/>
    <Tab.Screen name="Register" component={Register1} options={{
      tabBarIcon: () => { return <MaterialCommunityIcons name="account-circle-outline" size={21} color="black" />}
    }}/>

   

    </Tab.Navigator> 
    
  )

}


const App = () => {

  return (
    


      
    <NavigationContainer>
      <TabNavigator></TabNavigator>
      </NavigationContainer>)



  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
