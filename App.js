import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { View, Text } from "react-native";
import Login from "./src/pages/Login";
import {
  useFonts,
  Nunito_400Regular,
  Lato_400Regular,
  Inter_900Black,
} from "@expo-google-fonts/dev";
export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);

  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.otf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.otf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.otf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.otf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.otf"),
    PoppinsThin: require("./assets/fonts/Poppins-Thin.otf"),
    PoppinsExtraLight: require("./assets/fonts/Poppins-ExtraLight.otf"),
    PoppinsBlack: require("./assets/fonts/Poppins-Black.otf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins-ExtraBold.otf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Login />
      <StatusBar style='light' />
    </>
  );
}
