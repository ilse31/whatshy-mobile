import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Account,
  Broadcast,
  Contact,
  History,
  Home,
  PersonalMessages,
} from "../pages";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#00D7B9",
          height: 70,
          borderRadius: 15,
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          ...style.shadow,
        },
      }}
    >
      <Tab.Screen
        name='PersonalMessages'
        component={PersonalMessages}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name='paper-plane'
              size={24}
              style={{
                color: focused ? "#ffff" : "#000000",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Broadcast'
        component={Broadcast}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='broadcast'
              size={24}
              style={{
                color: focused ? "#ffff" : "#000000",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Contact'
        component={Contact}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: -30,
                backgroundColor: "#ffff",
                width: 70,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 35,
              }}
            >
              <MaterialCommunityIcons
                name='contacts'
                size={24}
                style={{
                  color: focused ? "#00D7B9" : "#000000",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='History'
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name='clock'
              size={24}
              style={{
                color: focused ? "#ffff" : "#000000",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name='user'
              size={24}
              style={{
                color: focused ? "#ffff" : "#000000",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainApp;

const style = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
