import React, { useState } from "react";
import { View, Text } from "react-native";
import { Avatar, Card, Divider, TextInput, Button } from "react-native-paper";

import ListingScreen from "../../../components/ListingScreen";
import Constants from "../../../constants/Constants";

const EditProfile = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  return (
    <ListingScreen title="Edit Profile">
      {/* <View style={{height: 600}}>
        <Divider />
    */}
      <Card>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Avatar.Image
            size={100}
            source={require("../../../../assets/avatar.jpg")}
          />
          <Button
            icon="image"
            mode="contained"
            onPress={() => console.log("Pressed")}
            style={{ margin: 10, backgroundColor: "white" }}
            uppercase={false}
          >
            <Text style={{ color: "black" }}>Change Avatar</Text>
          </Button>
        </View>
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
          <Button uppercase={false}
        //   style={{backgroundColor: Constants.tintColor}}
          >Update Profile</Button>
        </View>
      </Card>
    </ListingScreen>
  );
};

export default EditProfile;
