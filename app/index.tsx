import { TranslationKeys } from "@/locale";
import { Button, Card, ThemedText } from "@/src/components";
import { ThemedSVG } from "@/ThemeSvg";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeCard = ({title, description,icon,onPress}: {title: TranslationKeys, description: TranslationKeys, icon: "videoCam" | "comment", onPress: () => void}) => {
  return (
    <Card onPress={onPress}>
      <ThemedSVG variants={icon} themedFill="svg-primary" />
      <View className="flex-1 flex flex-col items-center gap-[5px] justify-center">
        <ThemedText variant="cardCaption" textContent={title} />
        <ThemedText className="text-center" variant="caption" textContent={description} />
      </View>
      </Card>
  )
}

export default function Index() {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleNavigation = () => {
    setIsDisabled(true);
    router.push('/login');
    setIsDisabled(false);
  }
  return (
    <SafeAreaView className="flex-1 items-center p-[10px] gap-[20px] justify-center scheme:bg-background">
      
      {/* Title */}
      <View className="flex flex-col items-center justify-center gap-[10px]">
      <ThemedText entering={FadeIn.duration(1000)} variant="title" textContent="welcome.consult" className="text-center" />
      {/* Subtitle */}
      <ThemedText
        variant="subtitle"
        textContent="welcome.consult_description"
        className="text-center"
      />
      </View>
      <View className="w-[100%] flex flex-col items-center justify-between gap-[10px]" >
      <WelcomeCard onPress={handleNavigation} icon="comment" title="welcome.chat-advice" description="welcome.chat-advice-description" />
      <WelcomeCard onPress={handleNavigation} icon="videoCam" title="welcome.video-consult" description="welcome.video-consult-description" />
      </View>
      <Button onPress={handleNavigation} disabled={isDisabled} label="welcome.get-started" variant="primary" className="mt-[10px]" />
    </SafeAreaView>
  );
}
