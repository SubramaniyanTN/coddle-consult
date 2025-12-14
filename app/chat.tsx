import { useAppSelector } from "@/redux/hooks/hooks";
import { AVATAR } from "@/src/utils";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Platform, View, } from "react-native";
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from 'react-native-uuid';

type MessageType={
    _id: string;
    text: string;
    createdAt: Date;
    user: {
        _id: number;
        name: string;
        avatar: string;
    };
}[]
export default function Chat() {
  const [messages, setMessages] = useState<MessageType>([])
  const {concern}=useAppSelector((state)=>state.AuthReducer)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const insets = useSafeAreaInsets()

  // If you have a tab bar, include its height
  const tabbarHeight = 50
  const keyboardTopToolbarHeight = Platform.select({ ios: 44, default: 0 })
  const keyboardVerticalOffset = insets.bottom + tabbarHeight + keyboardTopToolbarHeight
  const currentUser={
    _id: 1,
    name: 'John Doe',
    avatar: 'https://i.pinimg.com/originals/b8/5e/1c/b85e1c04ad15cba88755eba89b4cfada.jpg',
  }
  const doctorUser={
    _id: 2,
    name: 'Doctor',
    avatar: AVATAR.image,
  }
  useEffect(() => {
    setMessages([
      {
        _id: uuid.v4(),
        text: concern??'Hi , Can we check the time where doctor is available ?',
        createdAt: new Date(),
        user: currentUser,
      },
      {
        _id: uuid.v4(),
        text: 'Hi , what is your concern ?',
        createdAt: new Date(),
        user: doctorUser,
      },
    ])
  }, [])
  const getColor=(username:string)=>{
    let sumChars = 0;
    for(let i = 0;i < username.length;i++){
      sumChars += username.charCodeAt(i);
    }

    const colors = [
      '#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50', // midnight blue
    ];
    return colors[sumChars % colors.length];
  }
  const appendMessage=(message:MessageType)=>{
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    )
  }
  const onSend = useCallback((messages :MessageType) => {
    appendMessage(messages)
    setIsTyping(true)
    setTimeout(()=>{
      setIsTyping(false)
      appendMessage([{_id:uuid.v4(),text:'This is a test message',createdAt:new Date(),user:doctorUser}])
    }, 1000)
  }, [])

    return (
      <SafeAreaView className="flex-1 p-5">
       <GiftedChat
      messages={messages}
      onSend={newMessage => {
        onSend([{_id:uuid.v4(),text:newMessage[0].text,createdAt:new Date(),user:currentUser}])
      }}
      user={{
        _id: 1,
      }}
      renderBubble={(props)=>{
        let username = props.currentMessage.user.name
        let color =getColor(username)
        return( <Bubble {...props} textStyle={{
        right: {
          color: 'white'
        }
      }}
      wrapperStyle={{
        left: {
          backgroundColor: color
        }
      }} />)}}
      isTyping={isTyping}
      renderLoading={()=>{
        return(
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="black" />
          </View>
        )
      }}
      keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
    />
    </SafeAreaView>
  )
}