import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Home, Login, Register, WellComeScreen } from "../pages";
import PersonalMessages from "../pages/PersonalMessages";

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
        <Stack.Group>
          <Stack.Screen
            name='WellComeScreen'
            component={WellComeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      )}
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Home} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackRoutes;
