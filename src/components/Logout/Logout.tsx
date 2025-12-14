import { Button, ThemedText } from "@/src/components";
import { logout } from "@/src/utils";
import { Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type LogoutProps={
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export default function Logout({modalVisible, setModalVisible}: LogoutProps) {
    const handleClose=()=>{
        setModalVisible(false)
    }
    const {bottom} =useSafeAreaInsets()
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleClose}>
         <Pressable style={{paddingBottom:bottom}} onPress={handleClose} className="flex flex-1 justify-end">
            <View className="scheme:bg-card w-full min-h-[150px] rounded-t-[20px] justify-around items-center" >
            <ThemedText variant="title" className="self-center text-center" textContent="logout.logout-confirmation" />
            <View className="flex flex-row gap-[10px]" >
            <Button className="max-w-[45%]" label="logout.yes" variant="primary" onPress={logout} />
            <Button className="max-w-[45%]" label="logout.cancel" variant="primary" onPress={handleClose} />
            </View>
            </View>
         </Pressable>
        </Modal>
    )
}