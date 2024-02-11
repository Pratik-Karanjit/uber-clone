import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";

export default function App() {
  const stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <stack.Navigator>
            <stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: false,
              }}
            />
          </stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
