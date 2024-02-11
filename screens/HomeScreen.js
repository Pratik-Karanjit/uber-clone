import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";

const HomeScreen = () => {
  return (
    //SafeAreaView is used to render things inside of the visible region of phone
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        {/*Uber logo */}
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <NavOptions></NavOptions>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

//Way of giving css in React Native
const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});
