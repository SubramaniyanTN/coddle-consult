import { useAppSelector } from "@/redux/hooks/hooks";
import useThemedColors from "@/src/utils/useThemedColors";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import ChatHeader from "../ChatHeader/ChatHeader";

export default function InitialLayout() {
  const colors = useThemedColors()
    const {isAuthenticated}=useAppSelector((state)=>state.AuthReducer)
    return (
      <NavigationThemeProvider value={{
        colors:{
          primary:"red",
          background:colors["background"],
          card:colors["card"],
          text:colors["text"],
          border:colors["cardBorder"],
          notification:colors["text"],
        },
        dark:false,
        fonts: {
          regular: {
            fontFamily: "SF Pro Rounded",
            fontWeight: "400",
          },
          medium: {
            fontFamily: "SF Pro Rounded",
            fontWeight: "500",
          },
          bold: {
            fontFamily: "SF Pro Rounded",
            fontWeight: "700",
          },
          heavy: {
            fontFamily: "SF Pro Rounded",
            fontWeight: "800",
          },
        },   
        }}>
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
  </NavigationThemeProvider>
  )
}