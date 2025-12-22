import { Slot } from "expo-router";
import { BackendContext, api } from "./context";
import ThemeProvider from "./context/ThemeContext";



export default function RootLayout() {
  return (
    <ThemeProvider>
      <BackendContext.Provider value={api}>
        <Slot />
      </BackendContext.Provider>
    </ThemeProvider>
  );
}
