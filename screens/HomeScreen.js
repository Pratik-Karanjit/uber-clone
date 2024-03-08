// import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
// import React from "react";
// import tw from "tailwind-react-native-classnames";
// import NavOptions from "../components/NavOptions";

// const HomeScreen = () => {
//   return (
//     //SafeAreaView is used to render things inside of the visible region of phone
//     <SafeAreaView style={tw`bg-white h-full`}>
//       <View style={tw`p-5`}>
//         {/*Uber logo */}
//         <Image
//           style={{
//             width: 100,
//             height: 100,
//             resizeMode: "contain",
//           }}
//           source={{
//             uri: "https://links.papareact.com/gzs",
//           }}
//         />

//         <NavOptions></NavOptions>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// //Way of giving css in React Native
// const styles = StyleSheet.create({
//   text: {
//     color: "blue",
//   },
// });

import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const onChangeText = async (text) => {
    setInput(text);
    if (text.length === 0) return setData([]);
    if (text.length > 2) {
      let endpoint = `http://192.168.1.73:8000/api/search?location=${text}&limit=${5}`;
      try {
        const res = await fetch(endpoint);
        const locations = await res.json();
        setData(locations);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    }
  };

  const getItemText = (item) => {
    let mainText = item.address.name;
    if (item.type === "city" && item.address.state)
      mainText += ", " + item.address.state;

    return (
      <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
        <MaterialIcons
          name={item.type === "city" ? "location-city" : "location-on"}
          color={"black"}
          size={30}
        />
        <View style={{ marginLeft: 10, flexShrink: 1 }}>
          <Text style={{ fontWeight: "700" }}>{mainText}</Text>
          <Text style={{ fontSize: 12 }}>{item.address.country}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 20 }}>
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

          <TextInput
            placeholder="Find Location"
            value={input}
            onChangeText={onChangeText}
            style={{
              height: 40,
              marginVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          />

          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => alert("navigate passing" + JSON.stringify(item))}
              >
                {getItemText(item)}
              </Pressable>
            )}
            keyExtractor={(item, index) => item.osm_id + index}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
