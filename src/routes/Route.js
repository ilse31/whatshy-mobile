import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Account, Contact, History, Home, PersonalMessages } from "../pages";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#00D7B9",
          height: 55,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Entypo name='home' size={24} className='text-red-600' />
          ),
        }}
      />
      <Tab.Screen
        name='History'
        component={History}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name='clock' size={24} color='black' />,
        }}
      />
      <Tab.Screen
        name='PersonalMessages'
        component={PersonalMessages}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Entypo name='paper-plane' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='Contact'
        component={Contact}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name='contacts' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name='user' size={24} color='black' />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainApp;
