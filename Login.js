import React,{ Component }from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import ToolbarAndroid from '@react-native-community/toolbar-android';
import { TypingAnimation } from 'react-native-typing-animation'; 
//import FontAwesome from 'react-native-vector-icons/FontAwesome';//
import * as Animatable from 'react-native-animatable';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);
import { createSwitchNavigator , createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {userLogin} from '../actions/userAction';
import {connect} from 'react-redux';

//const axios = require('axios').default;
class Login extends Component{
  constructor(props){ 
    super(props);
    this.state={
      typing_email: false,
      typing_password: false,
      email:'',
     password:'',
     errors: {},
      animation_login : new Animated.Value(width-40),
      enable:true
    };
    this.validateForm=this.validateForm.bind(this);
  }
  handleEmail=(text)=>{
  this.setState({email: text})
 }
 handlePassword=(text)=>{
  this.setState({password: text})
 }

/*componentDidMount() {
  this.props.userAuth()
} */


validateForm(){
 const { errors } = this.state;
 const emailaddr = this.state.email;
 const pass = this.state.password;
 const reg =/^(?:\d{10}|\w+([\.-?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$)$/;
 if (emailaddr ===''){
  errors.email="Email address cannot be empty.";
 }else if(emailaddr.length>0 && !reg.test(emailaddr)){
  errors.email="Please provide correct email address.";
 }else {
  errors.email="";
 }
 if (pass ===''){
  errors.pass="password cannot be empty.";
 }else if(pass && pass.length<5){
  errors.pass="Password should have more than 5 characters.";
 }else {
  errors.pass="";
 }
 this.setState({ errors })
 if(errors.email==='' && errors.pass===''){
  const userinfo={
  email:this.state.email,
  password: this.state.password
}
this.props.onLogin(userinfo)
 //this.submitForm(); //
//this.props.navigation.navigate('Home');
 }
 }
componentDidUpdate(nextProps){
  if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true){
    this.props.navigation.navigate('Headerwala');
  }

} 
/*submitForm = async () => {
  let that =this;
  axios.post('http://192.168.43.37:8082/loginuser', {
    email: this.state.email,
    password: this.state.password
  })
  .then(function (response) {
    if(response && response.data && response.data._id) {
      that.props.navigation.navigate('Contact'); //sir ka home is display users/contacts page//
    } else if(response && response.data && response.data.message) {
     // Toast.show(response.data.message, 500);
     Alert.alert('OOPS!!', 'Invalid email address or password', [
      {text: 'Close',onPress:() => console.log('alert') }
       ]);
    }
  })
  .catch(function (error) {
    console.log(error);
     
  });
} */


  

  _foucus(value){
    if(value=="email"){
      this.setState({
        typing_email: true,
        typing_password: false
      })
    }
    else{
      this.setState({
        typing_email: false,
        typing_password: true
      })
    }
  }

  _typing(){
    return(
      <TypingAnimation 
        dotColor="orange"
        dotAmplitude={7}
        dotSpeed={0.25}
        dotRadius={3.5}
        dotMargin={4.5}
        style={{marginRight:25}}
      />
    )
  }

  _animation(){
    Animated.timing(
      this.state.animation_login,
      {
        toValue: 40,
        duration: 250,
        useNativeDriver: false
      }
    ).start();

    setTimeout(() => {
      this.setState({
        enable:false,
        typing_email: false,
        typing_password: false
      })
    }, 150);
  }


  render(){
    const {errors} =this.state;
    const width = this.state.animation_login;
    return(
      
        <ImageBackground
                source={require("./123.png")}
                style={styles.container}
              >
        <StatusBar barStyle="dark-content" hidden={true} />
          
          <View style={styles.header}>
              <ImageBackground
                source={require("./Logo.png")}
                style={styles.imageBackground}
              >
              </ImageBackground>
              
                <Text style={{
                  color:'white',
                  fontWeight:'bold',
                  fontSize:35,
                  fontFamily:'serif',
                  justifyContent:'center',
                  alignItems:'center'
                }}>Hey Gossipers..</Text>
                <Text style={{
                  color:'yellow',
                  justifyContent:'center',
                  alignItems:'center',
                  fontSize:15,
                  fontFamily:'serif'
                }}>Sign in to continue Gossiping!</Text> 
            </View>
          <View style={styles.footer}>
                <Text style={[styles.title,{
                  marginTop:50
                }]}>E-mail</Text>
                <View style={styles.action}>
                    <TextInput 
                      placeholder="Your email.."
                      placeholderTextColor="yellow"
                      style={styles.textInput}
                      onFocus={()=>this._foucus("email")}
                       onChangeText = {this.handleEmail}/>
                  
                    
                    {this.state.typing_email ?
                      this._typing()
                    : null}
                </View>
                 <Text style={[styles.errorstyle]}>{errors.email}</Text>
                <Text style={[styles.title,{
                  marginTop:20
                }]}>Password</Text>
                <View style={styles.action}>
                    <TextInput 
                      secureTextEntry
                      placeholder="Your password.."
                      placeholderTextColor="yellow"
                      style={styles.textInput}
                      onFocus={()=>this._foucus("password")}
                      onChangeText = {this.handlePassword}/>
                
                
                    {this.state.typing_password ?
                      this._typing()
                    : null}
                </View>
                <Text style={styles.errorstyle}>{errors.pass}</Text>
                <TouchableOpacity
                onPress={()=>this._animation()}>
                  <View style={styles.button_hello}>
                        <Animated.View style={[styles.animation,{
                          width
                        }]}> 
                          {this.state.enable ?
                            <Text style={styles.textLogin}>Remember Me</Text>
                            : 
                            <Animatable.View
                            animation="bounceIn"
                            delay={50}>
                              <Icon
                                name="ok"
                                color="white"
                                 size={30}/>
                            </Animatable.View> 
                          
                          }
                        </Animated.View >
                        
                             
                  </View>

                </TouchableOpacity>
                <View style = {styles.button_container}>
                 <TouchableOpacity
                  style = {styles.submitButton}
                   onPress = {
                    () =>this.validateForm() 

                            }>
                 <Text style = {styles.textLogin}>Login</Text>
                </TouchableOpacity>
                </View>

                
                         <View style={styles.signUp}>
                      <Text style={{color:'black'}}></Text>
                      <Text style={{color:'blue'}}></Text>
                       </View>
          </View>
     </ImageBackground>
    )
  }
}
function mapStateToProps(state){
  return{
    userReducer: state.userReducer
  };
}
function mapDispatchToProps(dispatch){
  return{
    onLogin:(userinfo) => dispatch(userLogin(userinfo))
    
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Login);

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    justifyContent:'center'
  },
  header: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  footer: {
    flex:2,
    padding:20
  },
  imageBackground:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:"90%",
    height:'100%',
    marginLeft: 50
  },
  title: {
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    fontFamily:'serif'
  },
  action: {
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#f2f2f2'
  },
  textInput: {
    flex:1,
    marginTop:5,
    paddingBottom:5,
    color:'white',
    fontSize:17
  },
  button_container: {
    alignItems: 'center',
    justifyContent:'center',


  },
  button_hello:{
    alignItems: 'center',
    justifyContent:'center',


  },
  animation: {
   backgroundColor:'#ffd700',
    paddingVertical :6,
    marginTop:25,
    borderRadius:50,
    justifyContent:'center',
    width: '30%',
    alignItems:'center',
    
    
  },
  textLogin: {
    color:'white',
    fontWeight:'bold',
    fontSize:25
  },
  signUp: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20
  },
  submitButton: {
  backgroundColor:'#ffd700',
    paddingVertical:6,
    marginTop:30,
    borderRadius:100,
    justifyContent:'center',
    width: '100%',
    alignItems:'center',
    marginTop:25
    
  },
  errorstyle:{
    color:'#ff4500',
    fontSize:15
  },
  submitButtonText:{
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold'
  }
});