import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Home, Login, Register, WellComeScreen } from "../pages";
import PersonalMessages from "../pages/PersonalMessages";
import MainApp from "./Route";

const Stack = createStackNavigator();

const StackRoutes = () => {
  const [firstLaunched, setfirstLaunched] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const getLocalstorage = async () => {
    const first = await AsyncStorage.getItem("firstLaunched");
    const login = await AsyncStorage.getItem("users");
    if (first === null) {
      setfirstLaunched(true);
      AsyncStorage.setItem("firstlaunched", "true");
    } else {
      setfirstLaunched(false);
    }
    if (login === null) {
      setisLogin(false);
    } else {
      setisLogin(true);
      console.log(login);
    }
  };

  useEffect(() => {
    getLocalstorage();
  }, []);

  return (
    <Stack.Navigator>
      {firstLaunched && (
        <Stack.Screen
          name='WellComeScreen'
          component={WellComeScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='Login'
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='Register'
        component={Register}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='main'
        component={MainApp}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
