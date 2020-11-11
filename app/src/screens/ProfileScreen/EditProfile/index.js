import React from "react";
import { View } from "react-native";
import { Card, Divider, TextInput, Button } from "react-native-paper";

import ListingScreen from "../../../components/ListingScreen";
import EditAvatar from "./EditAvatar";

const EditProfile = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  return (
    <ListingScreen title="Edit Profile">
      <Card>
        <EditAvatar />
      </Card>
      <Divider />
      <Card>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <TextInput
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            mode="outlined"
            style={{
              width: "90%",
              backgroundColor: "white",
              height: 40,
              margin: 10,
            }}
            //   error={true}
          />
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={(name) => setName(name)}
            mode="outlined"
            style={{
              width: "90%",
              backgroundColor: "white",
              height: 40,
              margin: 10,
            }}
            //   error={true}
          />
          <TextInput
            label="Phone"
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
            mode="outlined"
            style={{
              width: "90%",
              backgroundColor: "white",
              height: 40,
              margin: 10,
            }}
            keyboardType="number-pad"

            //   error={true}
          />
          <TextInput
            label="Address"
            value={address}
            onChangeText={(address) => setAddress(address)}
            mode="outlined"
            style={{
              width: "90%",
              backgroundColor: "white",
              height: 40,
              margin: 10,
            }}
            //   error={true}
          />
          <Button uppercase={false}>Update Profile</Button>
        </View>
      </Card>
    </ListingScreen>
  );
};

export default EditProfile;
