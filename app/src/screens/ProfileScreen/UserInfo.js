import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { Card, Avatar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Moment from "moment";
import Constants from "../../constants/Constants";
import Skeleton from "../../components/shared/Skeleton";
import { SERVER_BASE_URL } from "../../../utils/common";

const UserInfo = () => {
  const navigation = useNavigation();

  const { userProfile } = useSelector(
    (state) => state.user
  );

  if (!userProfile) {
    return <Skeleton />;
  }

  // useEffect(() => {
  //   if (userProfile && profilePictureResp) {
  //     dispatch(getUserProfile(userProfile._id));
  //   }
  // }, [profilePictureResp]);

  return (
    <View>
      <Card style={{ margin: 10, height: 250, flex: 1 }}>
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar.Image
              size={85}
              source={{
                uri: SERVER_BASE_URL + "/uploads/" + userProfile.photo,
              }}
            />
          </View>
          <View style={{ flex: 0.7 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, margin: 5 }}>
                {userProfile.name}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Button
                style={styles.changeProfileButton}
                uppercase={false}
                onPress={() => navigation.navigate("Edit Profile")}
              >
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
                  backgroundColor: Constants.lightGray,
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
        <View style={{ flex: 0.6 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.45, marginLeft: 10 }}>
              <Text style={styles.fadedTitle}>Mobile Number</Text>
              <Text>{userProfile.phoneno}</Text>
            </View>
            <View style={{ flex: 0.55 }}>
              <Text style={styles.fadedTitle}>Joined Since</Text>
              <Text>
                {Moment(userProfile.createdAt).startOf("hour").fromNow()}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.45, marginLeft: 10 }}>
              <Text style={styles.fadedTitle}>Date Of Birth</Text>
              <Text>{userProfile.dob}</Text>
            </View>
            <View style={{ flex: 0.55 }}>
              <Text style={styles.fadedTitle}>Gender</Text>
              <Text>{userProfile.gender}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.45, marginLeft: 10 }}>
              <Text style={styles.fadedTitle}>Address</Text>
              <Text>
                {
                  userProfile.location?.filter(
                    (location) => location.isActive !== null
                  )[0].address
                }
              </Text>
            </View>
            <View style={{ flex: 0.55 }}>
              <Text style={styles.fadedTitle}>Occupation</Text>
              <Text>Programmar</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  changeProfileButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    width: "45%",
    backgroundColor: Constants.chosenFilterBackgroundColor,
    shadowColor: "#fff",
  },
  fadedTitle: { fontSize: 12, color: Constants.grayColor },
});

export default UserInfo;
