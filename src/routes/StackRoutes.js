import { createStackNavigator } from "@react-navigation/stack";
import { Login, WellComeScreen } from "../pages";

const Stack = createStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='wellcome'
        component={WellComeScreen}
      />
      <Stack.Screen
        name='login'
        options={{ headerShown: false }}
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
