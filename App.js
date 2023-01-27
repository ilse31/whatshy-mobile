import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);
  return (
    <View className='flex-1 items-center justify-center bg-slate-900'>
      <Text className='text-white'>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style='auto' />
    </View>
  );
}
