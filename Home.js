import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ImageBackground,Image} from 'react-native';
import { GiftedChat, Bubble , Send,Avatar} from 'react-native-gifted-chat'; 
import {connect} from 'react-redux';
import {chatInsert,chatList} from '../actions/chatAction';
import {IconButton} from 'react-native-paper';
import SocketIOClient from 'socket.io-client';
import {SERVERURL} from '../../config';
import ActionBarImage from './logoimage';
import Icon from 'react-native-vector-icons/FontAwesome';




type Props = {
  name?: string,
};



class Home extends Component<Props>{
 // constructor(props) {
   // super(props);
   static navigationOptions = ({navigation}) => ({
    title: '  Gossiping with '+(navigation.state.params || {}).name || 'Gossip!',
    headerLeft:()=> < ActionBarImage />,
    headerStyle:{
    backgroundColor:'yellow'
     },
     headerTitleStyle:{
     fontFamily:'serif',
     fontSize:20,
     fontWeight:'bold',
     }
   });
    state = {
      userid: this.props.navigation.state.params.userid, 
      messages: [],
   
     
      
    };
    //this.onSend = this.onSend.bind(this);
   // this.socket = SocketIOClient('http://192.168.43.37:8082');
  /*navigationOptions: {
     title: 'Gossiping...',
     headerTintColor:'black',
     headerTintfontWeight:'bold',
     headerStyle:{
      backgroundColor:'yellow'
     }
    }*/
  
  componentDidMount() {
    this.socket = SocketIOClient('http://192.168.43.37:8082');
    const data = {
      receiver_id: this.props.navigation.state.params.userid,
      sender_id: this.props.userReducer.userAuth._id,
     

    };
    this.socket.emit('getMessage',data);
    this.socket.on('receiveMessage',(chatlist) => {
      if(chatlist) {
        this.setState({messages:chatlist});
      }
    });
    //setInterval(async () => {
     //this.props.onGetMessage(data)
    //},10000);
}

/*componentDidUpdate(nextProps) {
    if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true) {
         this.setState({
        messages: this.props.chatReducer.chatList
      })
    }
  } */

  onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))
}
submitChatMessage(messages = []){
  const date = new Date();
  
  this.onSend(messages)
  let details = {
    user:{
      _id: this.props.userReducer.userAuth._id,
   

    },
    receiver_id: this.state.userid,
    sender_id: this.props.userReducer.userAuth._id,
    chatdate: date,
    text:messages && messages[0] && messages[0].text,
    
  }
  //this.props.onChatMessage(details);
   this.socket.emit('chatMessage', details);
}

 renderSend = (props) => {
  return (
    <Send {...props} containerStyle={{ justifyContent: 'center', marginRight: 15 }}>
      <Icon size={30} color='darkorange' name='send' />
    </Send>
    );
  }
  
  



renderBubble = (props) => {

  return ( <Bubble {...props}
    textStyle={{
      right: { 
        color: '#000000',
        fontSize:18,
        fontWeight:'bold',
        fontFamily:'serif' 
      },
      left:{
        color: '#000000',
        fontSize:18,
        fontWeight:'bold',
        fontFamily:'serif'
      },
      
    }}
    timeTextStyle={{
      right:{
        color: '#000000',
        fontSize:12,
        fontFamily:'serif'
      },
      left:{
        color: '#000000',
        fontSize:12,
        fontFamily:'serif'
      },
    }}
    wrapperStyle={{
      left:{
        backgroundColor: '#fafad2',
      // position:'absolute',
        //left:0,
      },
      right:{
        backgroundColor: '#f0e68c',
      }
    }}/>
    );
}
 render() {
    return (
     <ImageBackground
                source={require("./123.png")}
                style={{flex: 1}}
              > 
     
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.submitChatMessage(messages)}
        renderBubble={this.renderBubble}
       user={{
          _id: this.props.userReducer.userAuth._id,
           
        }} 
        
        placeholder= 'Start your Gossip by typing here...'
        placeholderTextColor='orange'
        alwaysShowSend
     
        scrollToBottom
        renderAvatar={()=>null}
      
        renderSend={this.renderSend}
        
        

        
      />
    
    </ImageBackground>
  )
  }
}

 function mapStateToProps(state){

  return {
    chatReducer: state.chatReducer,
    userReducer: state.userReducer
  };
}

function mapDispatchToProps (dispatch) {
  return{
    onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
    onGetMessage: (data) => dispatch(chatList(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

const styles=StyleSheet.create ({
  sendingContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
   bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }

});