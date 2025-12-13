import { useAppSelector } from "@/redux/hooks/hooks";
import { Stack } from "expo-router";
import ChatHeader from "../ChatHeader/ChatHeader";

export default function InitialLayout() {
    const {isAuthenticated}=useAppSelector((state)=>state.AuthReducer)
    return (
    <Stack screenOptions={{ headerShown: false }} >
    <Stack.Protected guard={!isAuthenticated} >
    <Stack.Screen name="index" />
    <Stack.Screen name="login" />
    <Stack.Screen name="payment" />
    </Stack.Protected>
    <Stack.Protected guard={isAuthenticated} >
    <Stack.Screen name="chat" options={{header:()=> <ChatHeader />, headerShown: true}} />
    </Stack.Protected>
  </Stack>
  )
}