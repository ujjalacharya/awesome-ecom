import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Platform, Text } from "react-native";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { SERVER_BASE_URL } from "../../../../redux/services/productService";
import { updateProfilePicture } from "../../../../redux/actions/userActions";

const EditAvatar = ({ userProfile }) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.authentication)
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

    // console.warn(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      // let formData = new FormData();
      // formData.append("photo", result);
      // let formdata = new FormData();
      // formdata.append("photo", {
      //   name: result.uri,
      //   type: "image/jpeg",
      // });

      // for (var pair of formdata.entries()) {
      //   console.log(pair);
      // }

      let localUri = result.uri;
      let filename = localUri.split('/').pop();
    
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    
      let formData = new FormData();
      formData.append('photo', { uri: localUri, name: filename, type });

      dispatch(updateProfilePicture(formData, token));
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
          source={{
            uri: SERVER_BASE_URL + "/uploads/" + userProfile.photo,
          }}
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
