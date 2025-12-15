import { persistor, store } from "@/redux/store";
import { InitialLayout } from "@/src/components";
import { LogBox } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

LogBox.ignoreAllLogs();
export default function RootLayout() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <InitialLayout />
      </PersistGate>
    </Provider>
  )
}
