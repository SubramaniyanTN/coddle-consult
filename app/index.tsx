import { TranslationKeys } from "@/locale";
import { Button, Card, ThemedText } from "@/src/components";
import { ThemedSVG } from "@/ThemeSvg";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeCard = ({title, description,icon}: {title: TranslationKeys, description: TranslationKeys, icon: "videoCam" | "comment"}) => {
  const onPress = () => {
    console.log('WelcomeCard pressed');
  }
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
  return (
    <SafeAreaView className="flex-1 items-center p-[10px] gap-[10px] justify-center scheme:bg-background">
      
      {/* Title */}
      <ThemedText variant="title" textContent="welcome.consult" className="text-center" />
      
      {/* Subtitle */}
      <ThemedText
        variant="subtitle"
        textContent="welcome.consult_description"
        className="text-center"
      />
      <View className="w-[100%] flex flex-col items-center justify-between gap-[10px]" >
      <WelcomeCard icon="comment" title="welcome.chat-advice" description="welcome.chat-advice-description" />
      <WelcomeCard icon="videoCam" title="welcome.video-consult" description="welcome.video-consult-description" />
      </View>
      <Button label="welcome.get-started" variants="primary" />
    </SafeAreaView>
  );
}
