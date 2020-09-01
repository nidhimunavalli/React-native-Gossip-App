import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  ImageBackground,
  
  Alert,
  Platform
} from 'react-native';
import {userList,logout,userAuth,userLogin} from '../actions/userAction';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';







HEADER_MAX_HEIGHT = 60;
HEADER_MIN_HEIGHT = 40;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;



class Contact extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      scrollY: new Animated.Value(0),
      users: []

    };
  }
  componentDidMount() {
   
  this.props.onUserList()
}


componentDidUpdate(nextProps){
  if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true){
 
    this.setState({users:this.props.userReducer.userList});
  }
  if(this.props.userReducer && this.props.userReducer.userLogoutSuccess===true) {
   Alert.alert('Come back Soon!!', 'Logged Off successfully from Gossip.', [
      {text: 'Okay' }
       ]);
      
    this.props.navigation.navigate('Registration');
  }
}



 async onLogoff(){
 
   this.props.logout();
    }
  

   
    
goToChat=(userid,name)=>{
  this.props.navigation.navigate('Home', { userid:userid,name:name });
}
  render() {
    const {users} = this.state;
  



    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5
      ],
      extrapolate: 'clamp'
    });
    const headerZindex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
      outputRange: [0, 0, 1000],
      extrapolate: 'clamp'
    });

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          5 +
          PROFILE_IMAGE_MIN_HEIGHT +
          26
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: 'clamp'
    });

    return (
   //  <View style={{ flex: 1 }}>
     <ImageBackground
                source={require("./123.png")}
                style={{flex: 1}}
              > 
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'yellow',
            height: headerHeight,
            zIndex: headerZindex,
            elevation: headerZindex, //required for android
            alignItems: 'center'
          }}
        > 
        
         
       

          <Animated.View
            style={{ position: 'absolute', bottom: headerTitleBottom }}
          >
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold',fontFamily:'serif' }}>
            Hey {(this.props.userReducer && this.props.userReducer.userAuth? this.props.userReducer.userAuth.name: '')}..! Your Gossips
            </Text>

          </Animated.View>
        </Animated.View>

        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {useNativeDriver:false}
          )}
        >
          <Animated.View
            style={{
              height: profileImageHeight,
              width: profileImageHeight,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: 'white',
              borderWidth: 3,
              overflow: 'hidden',
              marginTop: profileImageMarginTop,
              marginLeft: 8
            }}
          >
            <Image
              source={require('./meeee.jpg')}
              style={{ flex: 1, width: null, height: null }}
             
            />
            
          </Animated.View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 30, paddingLeft: 8 ,color: 'yellow',fontFamily:'serif'}}>
              Gossipers
            </Text>
          </View>

        
        <View style={styles.containerrr}>


      {users && users.length>0 ?
        <View>
        {users.map((item, index) => {
         if(this.props.userReducer && this.props.userReducer.userAuth && item._id!=this.props.userReducer.userAuth._id){
        return (<TouchableOpacity onPress={()=>this.goToChat(item._id,item.name)} key={index} >
        
          <Text style={styles.item}>
            {item.name}
          </Text>
           
           <Divider style={styles.divider}/>
        
        </TouchableOpacity>

      
      )}})}
    </View>:null}
    
    
  
     
  
     <Button icon={
       <Icon 
       name='logout' 
       size={30} 
       color='black' 
       /> 
    }
    
   ViewComponent={LinearGradient} // Don't forget this!
  linearGradientProps={{
    colors: ['gold', 'yellow'],
    start: { x: 0.0, y: 0.25 },
    end: { x: 0.5, y: 1.0 }
  }}
   title="   LOG OFF"
   titleStyle={{color:'black',fontFamily:'serif',textAlign: 'center',fontWeight:'bold',fontSize:21,backgroundColor:'transparent'}}
    onPress= {
    () => this.onLogoff()
    }
   
    />
   
    
 
  
      </View>
      </ScrollView>
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
    onUserList:() => dispatch(userList()),
    logout:()=> dispatch(logout())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Contact);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerrr: {
    flex: 1,
    paddingTop: 5,
    height: 1500
   
  },
  item: {
    padding: 15,
    fontSize: 20,
    height: 52,
    color:'white',
    fontFamily: 'serif'
    
  },
   submitButtonText:{
    fontFamily:'serif',
    textAlign:'center',
  color: 'black',
  fontSize: 20,
  fontWeight: 'bold'
  },
  submitButton: {
  backgroundColor: 'yellow',
  padding: 10,
 
 
  height: 40,
  width: '100%'
  },
  divider:{
    backgroundColor:'#f0e68c',
    marginTop:20
  },
  button:{
    backgroundColor:'yellow'
  }


});