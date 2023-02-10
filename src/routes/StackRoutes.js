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

  useEffect(() => {
    // First launch check
    AsyncStorage.getItem("firstlaunched").then((value) => {
      if (value === null) {
        setfirstLaunched(true);
        AsyncStorage.setItem("firstlaunched", "false");
      } else {
        setfirstLaunched(false);
      }
    });

    // Login check
    AsyncStorage.getItem("users").then((value) => {
      if (value !== null) {
        setisLogin(true);
      } else {
        setisLogin(false);
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {firstLaunched ? (
        <Stack.Screen
          name='WellComeScreen'
          component={WellComeScreen}
          options={{ headerShown: false }}
        />
      ) : isLogin ? (
        <Stack.Screen
          name='main'
          component={MainApp}
          options={{ headerShown: false }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackRoutes;
