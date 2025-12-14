import { store } from "@/redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const logout = () => {
    AsyncStorage.clear()
    store.dispatch({type:"RESET_ALL"})
}