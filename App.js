import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "@expo-google-fonts/dev";
import "react-native-gesture-handler";
import { useColorScheme } from "nativewind";
import StackRoutes from "./src/routes/StackRoutes";
import { Provider } from "react-redux";
import store from "./src/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

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

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("firstlaunched");
      const users = await AsyncStorage.getItem("users");
      console.log(data);
      console.log(users);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  if (!fontsLoaded) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <StackRoutes />
          <StatusBar style='auto' />
        </Provider>
      </NavigationContainer>
    </>
  );
}
