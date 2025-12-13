import { persistor, store } from "@/redux/store";
import { InitialLayout } from "@/src/components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <InitialLayout />
      </PersistGate>
    </Provider>
  )
}
