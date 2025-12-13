import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="payment" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="payment" />
    </Stack>
  )
}
