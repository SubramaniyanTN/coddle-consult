import { AVATAR } from "@/src/utils";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../Avatar/Avatar";
import ThemedText from "../ThemedText/ThemedText";

export default function ChatHeader() {
    const {top}=useSafeAreaInsets()
    return (
        <View className="flex flex-row items-center justify-center gap-[10px]" style={{paddingTop:top}}>
            <Avatar name={AVATAR.name} size={60} source={{uri:AVATAR.image}} placeholder={{blurhash:AVATAR.blurhash}} />
            <View className="flex flex-col gap-[5px]" >
            <ThemedText variant="title" textContent="chat.doctor-name" />
            <ThemedText variant="subtitle" textContent="chat.doctor-bio" />
            </View>
        </View>
    )
}