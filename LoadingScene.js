import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Registration from './Registration';
import {Actions} from 'react-native-router-flux';
import {NavigationActions} from 'react-navigation';
import { createSwitchNavigator , createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {userAuth} from '../actions/userAction';
import {connect} from 'react-redux';


/* Logo */
import Logo from './Logo.png';
import image from './image.png';

/*const switchToRegistration = () => {
  Actions.replace('Registration')
}; */

class LoadingScene extends Component {
   constructor(props) {
    super(props);
    
    this.state = {
     LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    timePassed: false,
    loadingSpinner: false,
    userAuth:{},
    
    };
  }
  ///state = {
    /*LogoAnime: new Animated.Value(0),
    //LogoText: new Animated.Value(0),
    timePassed: false,
    loadingSpinner: false,
  }; */

  componentDidMount() {
    const {LogoAnime,LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 3000,
        useNativeDriver: false
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1500,
         useNativeDriver: false
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });

        
   this.props.userAuth()

      setTimeout( () => 
      {this.Decision();},2000); 
 
     
    });
                       
  }
Decision(){
   if(this.state.userAuth && this.state.userAuth.name){
    
   
     this.props.navigation.navigate('Headerwala'); 
   }
   else {
     this.props.navigation.navigate('Registration'); 
   }
  }

componentDidUpdate(nextProps){
 
  if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess===true){
   
   this.setState({userAuth:this.props.userReducer.userAuth});
  } 
 }
  
 

 
  render() {
     
    return (
      <ImageBackground 
      source={image}
      style={styles.container}>
      
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={Logo} />
          
        </Animated.View>
        <Animated.View style={{opacity:this.state.LogoText}}>
        <Text style={styles.logoText}>Let's GOSSIP</Text>
        </Animated.View>
     </ImageBackground>
    );
  }
}

function mapStateToProps(state){
  return{
    userReducer: state.userReducer
  };
}
function mapDispatchToProps(dispatch){
  return{
    //onLogin:(userinfo) => dispatch(userLogin(userinfo)),
    userAuth:()=> dispatch(userAuth())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(LoadingScene);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#5257F2',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoText: {
    color: 'yellow',
    fontFamily: 'serif',
    fontWeight:'bold',
     
    fontSize: 30,
    marginTop: -10,
    
  },
});