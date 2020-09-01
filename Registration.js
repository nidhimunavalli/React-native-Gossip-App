import React, {Component} from "react";
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
import fontelloConfig from './fontello-d355ad3c/config.json';
const Icon = createIconSetFromFontello(fontelloConfig);
import { createSwitchNavigator , createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import axios from 'axios';
import {userRegister} from '../actions/userAction';
import {connect} from 'react-redux';

//import {Icon} from 'react-native-elements';//
const axios = require('axios').default;
class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      typing_email: false,
      typing_password: false,
      typing_mobile:false,
      typing_name:false,
      email:'',
      password:'',
      errors: {},
      mobile:'',
      name:'',
      animation_login : new Animated.Value(width-40),
      enable:true
    };
    this.validateForm=this.validateForm.bind(this);
  }
 handleName=(text)=>{
  this.setState({name: text})
 }
 handleEmail=(text)=>{
  this.setState({email: text})
 }
 handlePassword=(text)=>{
  this.setState({password: text})
 }
 handleMobile=(text)=>{
  this.setState({mobile: text})
 }

 validateForm(){
 const { errors } = this.state;
 const emailaddr = this.state.email;
 const pass = this.state.password;
 const mob = this.state.mobile;
 const name = this.state.name;
 const reg =/^(?:\d{10}|\w+([\.-?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$)$/;
 const regn = /^[0-9]*$/;
 if (name ===''){
  errors.name="Name cannot be empty.";
 }else {
  errors.name="";
 }
 if (emailaddr ===''){
  errors.email="Email address cannot be empty.";
 }else if(emailaddr.length>0 && !reg.test(emailaddr)){
  errors.email="Please provide correct email address.";
 }else {
  errors.email="";
 }
 if (pass ===''){
  errors.pass="Password cannot be empty.";
 }else if(pass && pass.length<5){
  errors.pass="Password should have more than 5 characters.";
 }else {
  errors.pass="";
 }
 if (mob ===''){
  errors.mob="Mobile number cannot be empty.";
 }else if(!regn.test(mob)){
  errors.mob="Mobile number should be numeric";
  }else if(mob.length!=10){
  errors.mob="Mobile number should have ten digits only";
 }else {
  errors.mob="";
 }
 this.setState({ errors })
 if(errors.email==='' && errors.pass==='' && errors.mob==='' && errors.name===''){
 Alert.alert('Hurray!!', 'Your account has been successfully created.', [
      {text: 'GO GOSSIPING' }
       ]); 
  const userinfo={
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    mobile:this.state.mobile
   }
  
this.props.onRegister(userinfo)
 
 }
 }
 componentDidUpdate(nextProps) {
  if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true){
     
    this.props.navigation.navigate('Headerwala');
  }
}
/*Alert.alert('Hurray!!', 'Your account has been successfully created.', [
      {text: 'GO GOSSIPING',onPress:() => this.props.navigation.navigate('Headerwala') }
       ]); *\
 /*submitForm = async () => {
  let that =this;
  axios.post('http://192.168.43.37:8082/registeruser', {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    mobile:this.state.mobile
  })
  .then(function (response) {
    if(response && response.data && response.data._id) {
      //that.props.navigation.navigate('Login'); //sir ka home is display users/contacts page// add cookie here-with time
       Alert.alert('Hurray!!', 'Your account has been successfully created.', [
      {text: 'GO GOSSIPING',onPress:() => that.props.navigation.navigate('Login') }
       ]);
    } else  {
      Toast.show(response.data.message, 1000);
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
        typing_password: false,
        typing_mobile:false,
        typing_name:false
      })
    }
    else if(value=="password"){
      this.setState({
        typing_email: false,
        typing_password: true,
        typing_mobile:false,
        typing_name:false

      })
    }
    else if(value=="name"){
      this.setState({
        typing_email: false,
        typing_password: false,
        typing_mobile:false,
        typing_name:true

      })
    }
    else{
      this.setState({
        typing_email: false,
        typing_password: false,
        typing_mobile:true,
        typing_name:false

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
        toValue: 50,
        duration: 250,
        useNativeDriver: false
      }
    ).start();

    setTimeout(() => {
      this.setState({
        enable:false,
        typing_email: false,
        typing_password: false,
        typing_mobile:false,
        typing_name:false,
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
                  alignItems:'center',
                  marginTop:0
                }}>Gossip</Text>
                <Text style={{
                  color:'yellow',
                  justifyContent:'center',
                  alignItems:'center',
                  fontFamily:'serif',
                  fontSize:15
                }}>Create your account..</Text> 
            </View>
          <View style={styles.footer}>
          <Text style={[styles.title,{
                  marginTop:0
                }]}>Name</Text>
                <View style={styles.action}>
                    <TextInput 
                      placeholder="Enter your name.."
                      placeholderTextColor="yellow"
                      style={styles.textInput}
                      onFocus={()=>this._foucus("name")}
                       onChangeText = {this.handleName}
                    />
                    {this.state.typing_name ?
                      this._typing()
                    : null}
                </View>
                <Text style={[styles.errorstyle]}>{errors.name}</Text>

                <Text style={[styles.title,{
                  marginTop:1
                }]}>E-mail</Text>
                <View style={styles.action}>
                    <TextInput 
                      placeholder="Enter your email.."
                      placeholderTextColor="yellow"
                      style={styles.textInput}
                      onFocus={()=>this._foucus("email")}
                       onChangeText = {this.handleEmail}
                    />
                    {this.state.typing_email ?
                      this._typing()
                    : null}
                </View>
                <Text style={[styles.errorstyle]}>{errors.email}</Text>

                <Text style={[styles.title,{
                  marginTop:1
                }]}>Password</Text>
                <View style={styles.action}>
                    <TextInput 
                      secureTextEntry
                      placeholder="Create Password"
                      placeholderTextColor="yellow"
                      style={styles.textInput}
                      onFocus={()=>this._foucus("password")}
                      onChangeText = {this.handlePassword}
                    />
                    {this.state.typing_password ?
                      this._typing()
                    : null}
                </View>
                <Text style={styles.errorstyle}>{errors.pass}</Text>
                <Text style={[styles.title,{
                  marginTop:1
                }]}>Mobile number</Text>
                <View style={styles.action}>
                    <TextInput 
                     placeholder="Enter your mobile number.."
                     placeholderTextColor='yellow'
                      style={styles.textInput}
                      onFocus={()=>this._foucus("mobile")}
                      onChangeText = {this.handleMobile}
                    />
                    {this.state.typing_mobile ?
                      this._typing()
                    : null}
                </View>
                <Text style={styles.errorstyle}>{errors.mob}</Text>
                
                <View style = {styles.button_container}>
                 <TouchableOpacity
                  style = {styles.submitButton}
                   onPress = {
                    () => this.validateForm()
                     
                            }>
                 <Text style = {styles.textLogin}>Create</Text>
                </TouchableOpacity>
                </View>
                      <View style={styles.signUp}>
                      <Text style={{color:'white',fontFamily:'serif'}}>Already a Gossiper? </Text>
                      <TouchableOpacity
                      onPress = {
                       () => this.props.navigation.navigate('Login')
                     
                            }>
                      <Text style={{color:'yellow',fontFamily:'serif'}}> Sign In</Text>
                      </TouchableOpacity>
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
    onRegister:(userinfo) => dispatch(userRegister(userinfo))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Register);


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
    alignItems:'center'
  },
  footer: {
    flex:2.5,
    padding:20
  },
  imageBackground:{
    flex:3,
    justifyContent:'center',
    alignItems:'center',
    width:"85%",
    height:'100%',
    marginLeft: 50

  },
  title: {
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    fontFamily:'serif',
  },
  action: {
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#f2f2f2'
  },
  textInput: {
    color:'white',
    flex:1,
    marginTop:5,
    paddingBottom:5,
    fontSize:17
   
  },
  button_container: {
    alignItems: 'center',
    justifyContent:'center'
  },
  animation: {
    backgroundColor:'#93278f',
    paddingVertical:10,
    marginTop:30,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  },
  textLogin: {
    color:'white',
    fontWeight:'bold',
    fontSize:25,

  },
  signUp: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:5
  },
  submitButton: {
  backgroundColor:'#ffd700',
    paddingVertical:10,
    marginTop:30,
    borderRadius:100,
    justifyContent:'center',
    width: '50%',
    alignItems:'center',
    marginTop:10
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