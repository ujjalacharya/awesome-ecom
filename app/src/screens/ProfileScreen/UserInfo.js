import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Avatar, Button } from "react-native-paper";
import Constants from "../../constants/Constants";

function UserInfo() {
  return (
    <View>
      <Card style={{ margin: 10, height: 150, flex: 1 }}>
        <View style={{ flex: 0.7, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar.Image
              size={85}
              source={require("../../../assets/avatar.jpg")}
            />
          </View>
          <View style={{ flex: 0.7 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, margin: 5 }}>
                Ujjal Acharya
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Button style={styles.changeProfileButton} uppercase={false}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Constants.chosenFilterColor,
                  }}
                >
                  Edit Profile
                </Text>
              </Button>
              <Button
                style={{
                  ...styles.changeProfileButton,
                  backgroundColor: "white",
                }}
                uppercase={false}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                  }}
                >
                  Change Password
                </Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.3, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.4, marginLeft: 10 }}>
            <Text style={styles.fadedTitle}>Mobile Number</Text>
            <Text>9848658331</Text>
          </View>
          <View style={{ flex: 0.6 }}>
            <Text style={styles.fadedTitle}>Joined Since</Text>
            <Text>10th July 2019</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  changeProfileButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    width: "45%",
    backgroundColor: Constants.chosenFilterBackgroundColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fadedTitle: { fontSize: 12, color: Constants.grayColor },
});

export default UserInfo;
