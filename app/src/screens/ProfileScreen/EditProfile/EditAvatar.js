import React, { useState, useEffect } from "react";
import { View, Platform, Text } from "react-native";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const EditAvatar = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.warn(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
    >
      {image ? (
        <Avatar.Image size={100} source={{ uri: image }} />
      ) : (
        <Avatar.Image
          size={100}
          source={require("../../../../assets/avatar.jpg")}
        />
      )}
      <Button
        icon="image"
        mode="contained"
        onPress={pickImage}
        style={{ margin: 10, backgroundColor: "white" }}
        uppercase={false}
      >
        <Text style={{ color: "black" }}>Change Avatar</Text>
      </Button>
    </View>
  );
};

export default EditAvatar;
