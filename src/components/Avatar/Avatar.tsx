import { ThemedText } from "@/src/components";
import { ThemedSVG } from "@/ThemeSvg";
import { Image, ImageProps, ImageStyle } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

const COLORS = [
  "#FF6B6B",
  "#FF8E53",
  "#FFA41B",
  "#F7B801",
  "#6BCB77",
  "#4D96FF",
  "#845EC2",
  "#D65DB1",
  "#FF9671",
  "#0081CF",
];


type AvatarProps=Partial<ImageProps> & {
  name:string;
  isTwoLetter?:boolean;
  onPress?:()=>void
  size?:number;
  showAvatar?:boolean;
}

export default function Avatar({name,onPress,size=36,showAvatar=false ,isTwoLetter=false, ...props}:AvatarProps){
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState(false)
  const avatarColor=COLORS[Math.floor(Math.random()*COLORS.length)]
  const avatarStyle:ViewStyle={width:size,height:size,borderRadius:50}
  const nameInitial=name?isTwoLetter ? name.slice(0,2) : name.slice(0,1) : "X"
  if(error && showAvatar){
    return(
      <View style={[avatarStyle]}  className="rounded-full flex items-center justify-center bg-light-gray" >
      <ThemedSVG width={27} stroke="none" height={27} variants="userRounded" />
      </View>
    )
  }
  console.log({props})
  return (
    <Pressable className="rounded-full flex items-center justify-center " style={[avatarStyle,error && !showAvatar ? {backgroundColor:avatarColor} : {}]} onPress={onPress}>
     {error? <ThemedText className="text-[14px] font-bold text-white" children={nameInitial.toLocaleUpperCase()} /> :  <Image 
      {...props}
      onLoadStart={()=>setIsLoading(true)}
      onLoadEnd={()=>setIsLoading(false)}
      onError={()=>setError(true)}
      style={[avatarStyle as ImageStyle,props.style]} />}
      </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius:50
  },
});