import { Stack } from "expo-router";
import ContextProvider from "../context/Context";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ContextProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ContextProvider>
    </SafeAreaProvider>
  );
}
