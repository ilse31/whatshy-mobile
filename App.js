import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { View, Text } from "react-native";
import Login from "./src/pages/Login";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);
  return (
    <>
      <Login />
      <StatusBar style='light' />
    </>
  );
}
