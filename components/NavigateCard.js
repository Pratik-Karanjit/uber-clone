import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice.js";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning Pratik</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <TextInput
            placeholder="Where to?"
            value={input}
            onChangeText={onChangeText}
            style={toInputBoxStyles.textInput}
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
                  // console.log(item);
                  const { lat, lon, display_place, display_address } = item;
                  console.log("lat", lat);
                  console.log("lon", lon);
                  console.log("display Name", display_place);
                  console.log("display Address", display_address);

                  dispatch(
                    setDestination({
                      location: { lat, lon },
                      description: { display_place, display_address },
                    })
                  );
                  navigation.navigate("RideOptionsCard");
                  // Log the dispatched actions
                  console.log("Destination Dispatched:", {
                    location: { lat, lon },
                    description: { display_place, display_address },
                  });
                }}
              >
                {getItemText(item)}
              </Pressable>
            )}
            keyExtractor={(item, index) => item.osm_id + index}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 6,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginBottom: 12,
  },
});
