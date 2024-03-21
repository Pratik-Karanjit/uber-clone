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
import NavOptions from "../components/NavOptions";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice.js";

const HomeScreen = () => {
  const dispatch = useDispatch();
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
                // onPress={() => alert("navigate passing" + JSON.stringify(item))}
                onPress={(data, details = null) => {
                  console.log("locationX", data.nativeEvent.locationX);
                  console.log("locationY", data.nativeEvent.locationY);
                  console.log(item);
                  const { lat, lon, display_place, display_address } = item;
                  console.log("lat", lat);
                  console.log("lon", lon);
                  console.log("display Name", display_place);
                  console.log("display Address", display_address);

                  dispatch(
                    setOrigin({
                      location: { lat, lon },
                      description: { display_place, display_address },
                    })
                  );
                  dispatch(setDestination(null));
                  // Log the dispatched actions
                  console.log("Origin Dispatched:", {
                    location: { lat, lon },
                    description: { display_place, display_address },
                  });
                  console.log("Destination Dispatched:", null);
                }}
              >
                {getItemText(item)}
              </Pressable>
            )}
            keyExtractor={(item, index) => item.osm_id + index}
            showsVerticalScrollIndicator={false}
          />
          <NavOptions />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
