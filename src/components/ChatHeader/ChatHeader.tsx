import { AVATAR } from "@/src/utils";
import { ThemedSVG } from "@/ThemeSvg";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../Avatar/Avatar";
import ThemedText from "../ThemedText/ThemedText";

export default function ChatHeader() {
    const {top}=useSafeAreaInsets()
    return (
        <View className="flex flex-row items-center px-[10px] gap-[10px] justify-between" style={{paddingTop:top}}>
           <View className="flex flex-row items-center justify-center gap-[10px]">
           <Avatar name={AVATAR.name} size={60} source={{uri:AVATAR.image}} placeholder={{blurhash:AVATAR.blurhash}} />
            <View className="flex flex-col gap-[5px]" >
            <ThemedText variant="title" textContent="chat.doctor-name" />
            <ThemedText variant="subtitle" textContent="chat.doctor-bio" />
            </View>
           </View>
            <ThemedSVG width={30} height={30} variants="settingsPower" themedFill="svg-primary" />
        </View>
    )
}