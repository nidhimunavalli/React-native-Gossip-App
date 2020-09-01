import React from 'react';
import { createSwitchNavigator , createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Home from './pages/Home'; //sir ka chat//
import Registration from './pages/Registration';
import LoadingScene from './pages/LoadingScene';
import Contact from './pages/Contact'; //sir ka home//
import Headerwala from './pages/Headerwala'; //sir ka home with header//


const AuthStackNavigator = createStackNavigator ({
  
  LoadingScene: {
  screen: LoadingScene,
 }, 
 Registration: {
  screen: Registration,
  },
 Login: {
  screen: Login,
  }, 
 
 },{headerMode: 'none'} );


const AppStackNavigator = createStackNavigator ({
   Headerwala: {
  screen: Headerwala,
  navigationOptions:{
    headerShown:false,
  },
 }, 
  Home: {
  screen: Home,
  
},

 });


const  SwitchNavigator = createSwitchNavigator({
     AuthLoading:  AuthStackNavigator,
     App: AppStackNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  
});


const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;



